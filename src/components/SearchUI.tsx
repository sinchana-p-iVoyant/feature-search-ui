import React, { useEffect, useState } from 'react'
import { Table, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ShipmentDataItem, ResultObject } from '../App'
import MonacoEditor from 'react-monaco-editor';
import { SearchOutlined } from '@ant-design/icons'
import './SearchUI.css'

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

const columns: ColumnsType<DataType> = [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'name',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tracking Id',
    dataIndex: 'trackingId',
    key: 'trackingId',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    // render: (phone) => {phone === null ? '-' : phone}
  },
  {
    title: 'Address',
    dataIndex: 'addressLn1',
    key: 'addressLn1',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Party Type',
    dataIndex: 'partyType',
    key: 'partyType',
  },
  {
    title: 'rlCd',
    dataIndex: 'rlCd',
    key: 'rlCd',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Zip',
    dataIndex: 'zip',
    key: 'zip',
  }
];

interface ResultViewProps {
  receiverOfItemArray: ResultObject[];
}

export const SearchUI: React.FC<ResultViewProps> = ({ receiverOfItemArray, onSearch }) => {
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [table, setTable] = useState('table');

    const [searchOne, setSearchOne] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    
    const onChangeOne = (value: string) => {
        console.log(`selected ${value}`);
        setSearchOne(value)
  };
  
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
      
      setFilteredData(fData);      
    }
  }, [receiverOfItemArray, searchQuery]);

  console.log("Filtered initial data :\n")
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
            options={firstSearchOptions}
          />

          {
            searchOne === 'shipperUserId' ? (
              <Input disabled className='input' placeholder="Search by email, phone number, address, account number" prefix={<SearchOutlined />} />
            ) : (
              <Search
                  className='search-input'
                  placeholder="Search Address by street name, city, pincode"
                  onSearch={handleSearch}
                  style={{ height: '9px' }}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            )
          }
      </div>

      <div className='result-container'>
        <div className='text-btn-container'>
          <div className='text-container'>
            <h4>Customer Match </h4>
            <div></div>
            <p>Total Records found {filteredData.length}</p>
          </div>
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



