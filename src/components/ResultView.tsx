import React from 'react'
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { ShipmentDataItem, ReceiverOfItem, ExactMatchItem, SearchDataItem, ResultObject } from '../App'

import './Result.css'

interface DataType {
  key: string;
  name: string;
  phone: string;
  addressLn1: string;
  city: string;
  country: string;
  partType: string;
  rlCd: string;
  state: string;
  zip: string;
}


// type DataIndex = keyof DataType;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Sl.No',
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
      title: 'Part Type',
      dataIndex: 'partType',
      key: 'partType',
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
    partType: 'ShipTo',
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
    partType: 'ShipFrom',
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
    partType: 'ShipTo',
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
    partType: 'ShipFrom',
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
    partType: 'ShipTo',
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
    partType: 'ShipFrom',
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


  return (
    <div className='result-container'>
      <p className='match-count'>Customer Match- Total Records found (6)</p>
      <Table columns={columns} dataSource={data} pagination={false}/>
    </div>
  )
}
