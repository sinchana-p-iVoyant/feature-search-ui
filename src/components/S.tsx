import React, { useState } from 'react'
import { Select, Switch, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import './Search.css'

const { Search } = Input;

export const SearchView = ({ onSearch }) => {
    const [searchOne, setSearchOne] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    
    const onChangeOne = (value: string) => {
        console.log(`selected ${value}`);
        setSearchOne(value)
    };



    const handleSearch = () => {
        console.log("Searching...")
        console.log(searchQuery)
        // the parent component handles the logic related to the search action.
        // onSearch(searchQuery);
        setSearchQuery(searchQuery)
        return searchQuery
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

    

  return (
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
  )
}


//    {/* <Select
//             showSearch={searchOne !== 'shipperUserId'}
//             disabled={searchOne === 'shipperUserId'}
//             placeholder="Select..."
//             // icon={}
//             optionFilterProp="children"
//             onChange={onChangeTwo}
//               onSearch={onSearch}
//             // filterOption={filterOption}
//             options={secondSearchOptions}
//           /> */}