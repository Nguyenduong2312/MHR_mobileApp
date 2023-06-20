import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';


export default function Basic(props) {
  let dt=[{id:'2',filename:"file1"},{id:"123",filename:"file2"}]
  let a=dt.length;
    const [listData, setListData] = useState(
        Array(a)
            .fill('')
            .map((_, i) => ({ key: `${i}`, id: dt[i].id, role: dt[i].filename}))
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
        <Text style={styles.txt}>Role: Your {data.item.role}</Text>
      </View>
    </TouchableHighlight>
  );


  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => handleAccept(data,rowMap)}>
        <Text style={styles.backTextWhite}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleReject(data,rowMap)}>
        <Text style={styles.backTextWhite}>Reject</Text>
      </TouchableOpacity>
           <TouchableOpacity
        style={[styles.backRightBtn, styles.backMidBtnLeft]}
        onPress={() => handleViewIfo(data,rowMap)}>
        <Text style={styles.backTextWhite}>View Info</Text>
      </TouchableOpacity>
    </View>
  );
  const handleAccept = async (data,rowMap) => {
    console.log("ID at now is",data.item.id);
    deleteRow(rowMap, data.item.key)
    };
    
      const handleReject = async (data,rowMap) => {
    console.log("ID at now is",data.item.id);
     deleteRow(rowMap, data.item.key)
    };
      const handleViewIfo = (data,rowMap) => {
     console.log("ID=",data.item.id);
     props.navigation.navigate('User Info',{
            userid: data.item.id, acceptstatus:"no"}
     );
     close(rowMap,data.item.key)

  };
    

  return (
    <View style={styles.container}>
    <View style={styles.swipetext}>
         <Text style={styles.title}>Swipe Right to view sender's profile</Text>
       <Text style={styles.title}>Swipe Left to accept/reject requests</Text>
      </View>
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
  swipetext: {
marginBottom:10,
       alignItems: 'center',
    backgroundColor:'#0039a6',

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
 
   backMidBtnLeft: {
    backgroundColor: '#0039a6',
    left:0,
  },
  backRightBtnLeft: {
    backgroundColor: '#03C03C',
    right: 75,
  },
    title: {
          marginBottom:5,
          color: '#FFF',


    fontSize: 15,
    fontColor: '#0039a6',
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
