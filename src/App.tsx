import { useEffect, useState } from 'react';
import './App.css'
import { ResultView } from './components/ResultView';
import { SearchView } from './components/SearchView';
import {useGetSearchedDataQuery} from './features/api/apiSlice'


type ShipmentDataItem = {
  partyType: string;
  name: string;
  addressLn1: string;
  city: string;
  state: string;
  zip: string;
};

type ReceiverOfItem = {
  // shipmentData: string;
  shipmentData: ShipmentDataItem[];
};

type ExactMatchItem = {
  receiverOf: ReceiverOfItem[];
};

type SearchDataItem = {
  exactMatch: ExactMatchItem[];
};


function App() {

  const [data, setData] = useState(['']); 
  const [searchResults, setSearchResults] = useState([]);

  const {
    data: searchData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSearchedDataQuery();

    useEffect(() => {
      if (isSuccess) {
        console.log('Data loaded:', searchData);
       
    // Fetch Dynamically
    searchData.forEach((item: SearchDataItem, firstIndex: number) => {
      item.exactMatch.forEach((exactMatchItem: ExactMatchItem, exactMatchIndex: number) => {
        exactMatchItem.receiverOf.forEach((receiverOfItem: ReceiverOfItem, receiverOfIndex: number) => {
          console.log(
            `Item at indices [${firstIndex}, ${exactMatchIndex}, ${receiverOfIndex}]`
          );

          // Log information for each object in shipmentData
          receiverOfItem.shipmentData.forEach((shipmentDataItem: ShipmentDataItem, shipmentDataIndex: number) => {
            console.log(`   ShipmentData[${shipmentDataIndex}]:`);
            console.log(`   partyType: ${shipmentDataItem.partyType}`);
            console.log(`   name: ${shipmentDataItem.name}`);
            console.log(`   addressLn1: ${shipmentDataItem.addressLn1}`);
            console.log(`   city: ${shipmentDataItem.city}`);
            console.log(`   state: ${shipmentDataItem.state}`);
            console.log(`   zip: ${shipmentDataItem.zip}`);
          });
        });
      });
    });

      } else if (isError) {
        console.error('Error loading data:', error);
      }
    }, [isSuccess, isError, searchData, error]);

  console.log(searchData)
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
  
  const handleSearch = (searchOne: string, searchTwo: string) => {

    const filteredResults = data.filter((item) => {
      const searchTerm = searchTwo.toLowerCase(); // will have either 'phone' or 'address' or 'email' or 'accountNbr'

      if (searchOne === 'name') {

        const nameMatches = item.name.toLowerCase().includes(searchTerm);

        switch (searchTwo) {
          case 'phone':
            return nameMatches || item.phone.toLowerCase().includes(searchTerm);
          case 'email':
            return nameMatches || item.email.toLowerCase().includes(searchTerm);
          case 'address':
            return nameMatches || item.address.toLowerCase().includes(searchTerm);
          case 'accountNbr':
            return nameMatches || item.accountNbr.toLowerCase().includes(searchTerm);
          default:
            return nameMatches;
          
        }
      } else if (searchOne === 'shipperUserId') {
        return item.shipperUserId.toLowerCase().includes(searchTerm);
      }
      return false; 
    });

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <SearchView onSearch={handleSearch} />
      {/* <ResultView /> */}
    </div>
  )
}

export default App
