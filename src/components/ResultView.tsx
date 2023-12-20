import React, { useState } from 'react'
import { Button, Space, Table, Switch, Input } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { ShipmentDataItem, ReceiverOfItem, ExactMatchItem, SearchDataItem, ResultObject } from '../App'
import MonacoEditor from 'react-monaco-editor';
import jsonData from '../../data/db.json'

import './Result.css'

interface DataType {
  key: string;
  name: string;
  phone?: string;
  addressLn1: string;
  city: string;
  country: string;
  partyType: string;
  rlCd: string;
  state: string;
  zip: string;
}


// type DataIndex = keyof DataType;

  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'name',
      // width: '30%',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // width: '30%',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'addressLn1',
      key: 'addressLn1',
      // ...getColumnSearchProps('address'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Party Type',
      dataIndex: 'partyType',
      key: 'partyType',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'rlCd',
      dataIndex: 'rlCd',
      key: 'rlCd',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    },
    {
      title: 'Zip',
      dataIndex: 'zip',
      key: 'zip',
      // width: '20%',
      // ...getColumnSearchProps('age'),
    }
];
  
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    phone: '9999',
    addressLn1 : 'abc',
    city: "FAIR LAWN",
    country: "US",
    partyType: 'ShipTo',
    rlCd: "Intended Delivery Location-Pkg Addr",
    state: "NJ",
    zip: "07410",
  },
  {
    key: '2',
    name: 'CONVERSE',
    phone: '0000000000',
    addressLn1 : '11500 80TH avenue',
    city: "PLEASANT PRAIRIE",
    country: "US",
    partyType: 'ShipFrom',
    rlCd: "Intended Delivery Location-Pkg Addr",
    state: "WI",
    zip: "531582909",
  },
  {
    key: '3',
    name: 'John Brown',
    phone: '9999',
    addressLn1 : 'abc',
    city: "FAIR LAWN",
    country: "US",
    partyType: 'ShipTo',
    rlCd: "Intended Delivery Location-Pkg Addr",
    state: "NJ",
    zip: "07410",
  },
  {
    key: '4',
    name: 'CONVERSE',
    phone: '0000000000',
    addressLn1 : '11500 80TH avenue',
    city: "PLEASANT PRAIRIE",
    country: "US",
    partyType: 'ShipFrom',
    rlCd: "Intended Delivery Location-Pkg Addr",
    state: "WI",
    zip: "531582909",
  },
  {
    key: '5',
    name: 'John Brown',
    phone: '9999',
    addressLn1 : 'abc',
    city: "FAIR LAWN",
    country: "US",
    partyType: 'ShipTo',
    rlCd: "Intended Delivery Location-Pkg Addr",
    state: "NJ",
    zip: "07410",
  },
  {
    key: '6',
    name: 'CONVERSE',
    phone: '0000000000',
    addressLn1 : '11500 80TH avenue',
    city: "PLEASANT PRAIRIE",
    country: "US",
    partyType: 'ShipFrom',
    rlCd: "Intended Delivery Location-Pkg Addr",
    state: "WI",
    zip: "531582909",
  },
];



interface ResultViewProps {
  receiverOfItemArray: ResultObject[];
}

export const ResultView: React.FC<ResultViewProps> = ({ receiverOfItemArray }) => {
  console.log(receiverOfItemArray)
  
  let filteredData = []
  let result
  
  if (receiverOfItemArray) {
    setTimeout(() => {
      

    receiverOfItemArray.forEach((item) => {
      item.receiverOfItem.shipmentData.forEach((sd) => {
        filteredData.push(sd);
      });
    });

      console.log(filteredData)
      
    }, 3000)
  }

  const [table, setTable] = useState('table')


  switch (table) {
    // case 'table':
    //   result = setTimeout(() => {
    //     return  <Table columns = { columns } dataSource = { filteredData } pagination = { false} />
    //   }, 1000)
    //   break;
    case 'table':
      result = <Table columns = { columns } dataSource = { data } pagination = { false} />
      break;
    case 'json':
      result = <MonacoEditor
                  height="650"
                  language="json"
                  theme="vs-dark"
                  value={JSON.stringify(jsonData, null, 2)}
                  options={{
                    selectOnLineNumbers: true,
                  }}
                />
      break;
    default:
      break;
  }

  return (
    <div className='result-container'>
      <div className='text-btn-container'>
        <h4>Customer Match | <span>Total Records found (6)</span></h4>
        <div className='toggle-container'>
          <div className={table === 'table' ? `active` : ``} onClick={() => setTable('table')}>Table View</div>
          <div className={table === 'json' ? `active` : ``} onClick={() => setTable('json')}>JSON View</div>
        </div>
      </div>
      
      {
        result
      }
      
    </div>
  )
}
