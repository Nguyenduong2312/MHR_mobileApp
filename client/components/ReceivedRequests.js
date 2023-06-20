import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
let dt = [
  { id: '2', filename: 'file1' },
  { id: '123', filename: 'file2' },
];
export default function Basic() {

  const [requestList, setRequestList] = useState();

  console.log('my request: ',SyncStorage.get('token'));

  useEffect(() => {
    fetch(`http://192.168.1.9:5000/account/user`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            authorization: `Bearer ${SyncStorage.get('token')}`,
        },
    })
        .then((res) => res.json())
        .then((account) => {
          console.log('acc', account);
            console.log('id:', account.id);
            fetch(`http://192.168.1.9:5000/requestRecord/receiver/${account.id}`, {
                headers: {
                    authorization: `Bearer ${SyncStorage.get('token')}`,
                },
            })
                .then((res) => res.json())
                .then((request) => {
                  console.log('request ', request);
                  setRequestList(records);
                },[]);
        });
    }, []);


  let a = dt.length;
  const [listData, setListData] = useState(
    Array(a)
      .fill('')
      .map((_, i) => ({ key: `${i}`, id: dt[i].id, filename: dt[i].filename }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#AAA'}>
      <View>
        <Text style={styles.txt}>Sender ID: {data.item.id}</Text>
        <Text style={styles.txt}>File name: {data.item.filename}</Text>
      </View>
    </TouchableHighlight>
  );
  const downloadFromAPI = async (data, rowMap) => {
    console.log('ID at now is', data.item.id);
    const localhost = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
    const result = await FileSystem.downloadAsync(
      ` `, //fetch
      FileSystem.documentDirectory + filename,
      {
        headers: {
          MyHeader: 'MyValue',
        },
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers['Content-Type']);
    closeRow(rowMap, data.item.key);
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => downloadFromAPI(data,rowMap)}>
        <Text style={styles.backTextWhite}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={requestList}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  txt: {
    color: '#0039a6',
    fontSize: 15,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0039a6',
    justifyContent: 'center',
    height: 100,
  },
  rowBack: {
    alignItems: 'center',

    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#0039a6',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});