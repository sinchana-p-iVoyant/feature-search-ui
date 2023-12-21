import { useEffect, useState } from 'react';
import './App.css'
import { ResultView } from './components/ResultView';
import { SearchView } from './components/SearchView';
import {useGetSearchedDataQuery} from './features/api/apiSlice'

import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { ShipmentDataItem, ReceiverOfItem, ExactMatchItem, SearchDataItem, ResultObject } from '../App'

// import './Result.css'

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}


// type DataIndex = keyof DataType;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Sl.No',
      dataIndex: 'key',
      key: 'name',
      width: '30%',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      // ...getColumnSearchProps('address'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    }
];
  
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

export type ShipmentDataItem = {
  partyType: string;
  name: string;
  addressLn1: string;
  city: string;
  state: string;
  zip: string;
  adTknNr?: string,
  phone?: string,
  rICd: string
};

export type ReceiverOfItem = {
  // shipmentData: string;
  shipmentData: ShipmentDataItem[];
};

export type ExactMatchItem = {
  receiverOf: ReceiverOfItem[];
};

export type SearchDataItem = {
  exactMatch: ExactMatchItem[];
};

export interface ResultObject {
  receiverOfItem: ReceiverOfItem;
}

function App() {

  // const [searchQuery, setSearchQuery] = useState('');
  // const [data, setData] = useState(['']); 
  // const [searchResults, setSearchResults] = useState([]);

  const {
    data: searchData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSearchedDataQuery();

  const receiverOfItemArray: ResultObject[] = [];

  useEffect(() => {
    if (isSuccess) {
      console.log('Raw Data loaded:', searchData);

      searchData.forEach((item: SearchDataItem, firstIndex: number) => {
        item.exactMatch.forEach((exactMatchItem: ExactMatchItem, exactMatchIndex: number) => {
          exactMatchItem.receiverOf.forEach((receiverOfItem: ReceiverOfItem, receiverOfIndex: number) => {
            const resultObject: ResultObject = {
                receiverOfItem
            };
            receiverOfItemArray.push(resultObject);
          });
        });
      });
      
      console.log(receiverOfItemArray);

    } else if (isError) {
      console.error('Error loading data:', error);
    }
  }, [isSuccess, isError, searchData, error]);

  // console.log(searchData)

  
  // const handleSearch = (query) => {
  //     const filteredResults = searchData.filter((item, i) => {
  //       return Object.values(item).some((value) =>
  //         {            
  //           value ? value.toString().toLowerCase().includes(query) : false
  //         }
  //       );
  //     });
  //     setSearchQuery(query);
  //     setSearchResults(filteredResults);
  // };

  // const handleSearch2 = ((array, query)) => {
  //   const filteredResults = array.filter((receiver) => {
  //     return receiver.shipmentData.some((item) => {
  //       return Object.values(item).some((value) => {
  //         console.log(Object.values(item));
  //         return value ? value.toString().toLowerCase().includes(query.toLowerCase()) : false;
  //       });
  //     });
  //   });

  //   setSearchQuery(query);
  //   setSearchResults(filteredResults);
  // };

  return (
    <div className='app-container'>
      {/* <SearchView /> */}
      {
        isSuccess && <ResultView receiverOfItemArray={receiverOfItemArray} />
      }
      
    </div>
  )
}

export default App















// interface ResultArray {
//   firstIndex: number;
//   exactMatchIndex: number;
//   receiverOfIndex: number;
//   value: string;
// }

// console.log(searchData[0].exactMatch[0].receiverOf[0].shipmentData)

// shipmentData: (2) [{…}, {…}]
// 0 : {partyType: 'ShipTo', name: 'STEVEN RIDEL', addressLn1: '123 WEST ABC street', city: 'FAIR LAWN', state: 'NJ', zip: '07410'}
// 1 : {partyType: 'ShipFrom', name: 'CONVERSE', addressLn1: '11500 80TH avenue', city: 'PLEASANT PRAIRIE', state: 'WI', zip: '531582909'}

// op:
// Item at indices [0, 0, 2]
// ShipmentData[0]:
// partyType: ShipTo
// name: STEPHAN RIDEL
// addressLn1: 123 WEST ABC street
// city: FAIR LAWN
// state: NJ
// zip: 07410
  
// ShipmentData[1]:
// partyType: ShipFrom
// name: CONVERSE
// addressLn1: 11500 80TH avenue
// city: PLEASANT PRAIRIE
// state: WI
// zip: 531582909

// const resultObject = {
//   firstIndex,
//   exactMatchIndex,
//   receiverOfIndex,
//   value: `Item at indices [${firstIndex}, ${exactMatchIndex}, ${receiverOfIndex}]`,
// };

    // Fetch Dynamically
    // searchData.forEach((item: SearchDataItem, firstIndex: number) => {
    //   item.exactMatch.forEach((exactMatchItem: ExactMatchItem, exactMatchIndex: number) => {
    //     exactMatchItem.receiverOf.forEach((receiverOfItem: ReceiverOfItem, receiverOfIndex: number) => {
    //       console.log(
    //         `Item at indices [${firstIndex}, ${exactMatchIndex}, ${receiverOfIndex}]`
    //       );

    //       // Log information for each object in shipmentData
    //       receiverOfItem.shipmentData.forEach((shipmentDataItem: ShipmentDataItem, shipmentDataIndex: number) => {
    //         console.log(`   ShipmentData[${shipmentDataIndex}]:`);
    //         console.log(`   partyType: ${shipmentDataItem.partyType}`);
    //         console.log(`   name: ${shipmentDataItem.name}`);
    //         console.log(`   addressLn1: ${shipmentDataItem.addressLn1}`);
    //         console.log(`   city: ${shipmentDataItem.city}`);
    //         console.log(`   state: ${shipmentDataItem.state}`);
    //         console.log(`   zip: ${shipmentDataItem.zip}`);
    //         console.log(`   adTknNr: ${shipmentDataItem.adTknNr}`);
    //         console.log(`   phone: ${shipmentDataItem.phone}`);
    //         console.log(`   rICd: ${shipmentDataItem.rICd}`);

    //       });
    //     });
    //   });
        // });