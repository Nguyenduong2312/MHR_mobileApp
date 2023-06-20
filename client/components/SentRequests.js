import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

export default function Basic() {
  let dt=[{id:'2',filename:"file1",status:"Accepted"},{id:"123",filename:"file2",status:"Rejected"},{id:"134",filename:"file3",status:"Waitting"}]
  let a=dt.length;
    const [listData, setListData] = useState(
        Array(a)
            .fill('')
            .map((_, i) => ({ key: `${i}`, id: dt[i].id, filename: dt[i].filename,status:dt[i].status}))
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
        <Text style={styles.txt}>Receiver ID: {data.item.id}</Text>
        <Text style={styles.txt}>File name: {data.item.filename}</Text>
      {data.item.status=='Accepted'  ? (
          <Text style={styles.accepted}>[{data.item.status}]</Text>
        ) : null}
        {data.item.status == 'Rejected' ? (
          <Text style={styles.rejected}>[{data.item.status}]</Text>
        ) : null}
        {data.item.status == 'Waitting' ? (
          <Text style={styles.waitting}>[{data.item.status}]</Text>
        ) : null}
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
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
  accepted: {
    color: '#03C03C',
    fontWeight: 'bold',
  },
  waitting: {
    color: '#FFC300',
    fontWeight: 'bold',
  },
  rejected: {
    color: '#FF4433',
    fontWeight: 'bold',
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
    backgroundColor: 'red',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#0039a6',

    right: 0,
  },
});
