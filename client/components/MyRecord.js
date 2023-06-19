import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import SyncStorage from 'sync-storage';

import { SwipeListView } from 'react-native-swipe-list-view';
import * as FileSystem from 'expo-file-system';
export default function Basic() {
    ///
  const [listData, setListData] = useState();

  console.log('my record: ',SyncStorage.get('token'));

  useEffect(() => {
    fetch('http://192.168.1.27:5000/account/user', {
        credentials: 'include',
        method: 'GET',
        headers: {
            authorization: `Bearer ${SyncStorage.get('token')}`,
        },
    })
        .then((res) => res.json())
        .then((account) => {
            console.log('id:', account.account.id);
            fetch(`http://192.168.1.27:5000/record/${account.account.id}`, {
                headers: {
                    authorization: `Bearer ${SyncStorage.get('token')}`,
                },
            })
                .then((res) => res.json())
                .then((records) => {
                    setListData(records);
                },[]);
        });
    }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    <TouchableHighlight
      style={styles.rowFront}
      underlayColor={'#AAA'}>
      <View>
        <Text style={styles.txt}>File name: {data.item.fileName}</Text>
        <Text style={styles.txt}>ID Uploader: {data.item.idUploader}</Text>
      </View>
    </TouchableHighlight>
  );
  const downloadFromAPI = async (data,rowMap) => {
    const filename="download";
    closeRow(rowMap,data.item.key);
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `http://192.168.1.27:5000/record/download/${data.item._id}`,//fetch
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
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
        onPress={() => {downloadFromAPI(data,rowMap)}}>
        <Text style={styles.backTextWhite}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
 
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
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
    height: 80,
  },
    title: {
    marginTop: 60,
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 35,
    color: '#0039a6',
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
    backgroundColor: '#03C03C',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
