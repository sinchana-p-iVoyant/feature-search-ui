import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Switch, Input, Select } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { ShipmentDataItem, ReceiverOfItem, ExactMatchItem, SearchDataItem, ResultObject } from '../App'
import MonacoEditor from 'react-monaco-editor';
import jsonData from '../../data/db.json'
import './Result.css'

// search component:
import { SearchOutlined } from '@ant-design/icons'
import './Search.css'

const { Search } = Input;

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
  trackingId: string;
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
      title: 'Tracking Id',
      dataIndex: 'trackingId',
      key: 'trackingId',
      // width: '30%',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      // render: (phone) => {phone === null ? '-' : phone}
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
interface ResultViewProps {
  receiverOfItemArray: ResultObject[];
}

export const ResultView: React.FC<ResultViewProps> = ({ receiverOfItemArray, onSearch }) => {
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [table, setTable] = useState('table');

    const [searchOne, setSearchOne] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    
    const onChangeOne = (value: string) => {
        console.log(`selected ${value}`);
        setSearchOne(value)
  };
  
    //   const handleSearch = () => {
    //     console.log("Searching...")
    //     console.log(searchQuery)
    //     // the parent component handles the logic related to the search action.
    //     // onSearch(searchQuery);
    //     setSearchQuery(searchQuery)
    //     return searchQuery
    // };


    const firstSearchOptions = [
        {
            value: 'name',
            label: 'Name',
        },
        {
            value: 'shipperUserId',
            label: 'Shipper User Id',
        }
    ]

  // ---- Start: To get initial filtered data (to table) ---------
  useEffect(() => {
    let count = 0;
    if (receiverOfItemArray) {
      const fData:ShipmentDataItem[] = [];
      receiverOfItemArray.forEach((item, i) => {
        const trackingId = item.receiverOfItem.trackingId;
        console.log(item.receiverOfItem.trackingId)
        item.receiverOfItem.shipmentData.forEach((sd, j) => {
          count++
          fData.push({...sd, key: count, trackingId});
        });
      });
      
      // Set the filteredData state once the data is ready
      setFilteredData(fData);

      // onSearch(filteredData, searchQuery)
      // onSearch()
      
    }
  }, [receiverOfItemArray, searchQuery]);

  console.log("filtered data later:\n")
  console.log(filteredData)

  // ---- End: To get initial filtered data (to table) ---------


  const handleSearch = () => {
    const searchedResults = filteredData.filter((item) => {
      return Object.values(item).some((value) => {
        const includesSearchQuery = value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false;
        console.log(Object.values(item));
        console.log(includesSearchQuery);
        return includesSearchQuery;
      });
    });

    setFilteredData(searchedResults);
  };

  console.log("Filtered data after search:")
  console.log(filteredData)

  let result;

  switch (table) {
    case 'table':
      result = <Table columns={columns} dataSource={filteredData} pagination={false} />;
      break;
    case 'json':
      result = (
        <MonacoEditor
          height="650"
          language="json"
          theme="vs-dark"
          value={JSON.stringify(filteredData, null, 2)}
          options={{
            selectOnLineNumbers: true,
          }}
        />
      );
      break;
    default:
      break;
  }

  console.log("Current Value:")
  console.log(filteredData)
 
  return (
    <div>
      <div className='inputs-container'>
          <Select
            className='select-box'
            showSearch
            placeholder="Search by:"
            optionFilterProp="children"
            onChange={onChangeOne}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={firstSearchOptions}
          />

          {
              searchOne === 'shipperUserId' ? (
                <Input disabled className='input' placeholder="Search by email, phone number, address, account number" prefix={<SearchOutlined />} />
              ) : (
                    <Search
                        className='search-input'
                        placeholder="input search text"
                        onSearch={handleSearch}
                        style={{ height: '9px' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
              )
          }
    
      </div>
      <div className='result-container'>
        <div className='text-btn-container'>
          <h4>Customer Match | <span>Total Records found (6)</span></h4>
          <div className='toggle-container'>
            <div className={table === 'table' ? `active` : ``} onClick={() => setTable('table')}>Table View</div>
            <div className={table === 'json' ? `active` : ``} onClick={() => setTable('json')}>JSON View</div>
          </div>
        </div>
        
        {result}
      </div>
    </div>
  );
};



