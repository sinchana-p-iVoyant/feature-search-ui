import React, { useState } from 'react'
import { Select, Switch } from 'antd';

export const SearchView = ({ onSearch }) => {
    const [searchOne, setSearchOne] = useState('')
    const [searchTwo, setSearchTwo] = useState('')

    const onChangeOne = (value: string) => {
        console.log(`selected ${value}`);
        setSearchOne(value)
    };

    const onChangeTwo = (value: string) => {
        console.log(`selected ${value}`);
        setSearchTwo(value)
        console.log(searchTwo)
    };

    // const onSearch = (value: string) => {
    //     console.log('search:', value);
    // };

    const handleSearch = () => {
        onSearch(searchOne, searchTwo);
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

    const secondSearchOptions = [
        {
            value: 'phone',
            label: 'Phone',
        },
        {
            value: 'email',
            label: 'Email',
        },
        {
            value: 'address',
            label: 'Address',
        },
        {
            value: 'accountNumber',
            label: 'Account Number',
        },
    ]

  
//   console.log(useGetSearchedDataQuery());

  return (
    <div>
        <Select
            showSearch
            placeholder="Select..."
            optionFilterProp="children"
            onChange={onChangeOne}
            onSearch={onSearch}
            // filterOption={filterOption}
            options={firstSearchOptions}
        />
        <Select
            showSearch={searchOne !== 'shipperUserId'}
            disabled={searchOne === 'shipperUserId'}
            placeholder="Select..."
            optionFilterProp="children"
            onChange={onChangeTwo}
            onSearch={onSearch}
            // filterOption={filterOption}
            options={secondSearchOptions}
          />
          <Switch checkedChildren='JSON' unCheckedChildren='Table' defaultChecked />
    </div>
  )
}
