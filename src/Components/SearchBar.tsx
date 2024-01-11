import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
   searchData: string;
   setSearchData: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ searchData, setSearchData }: Props) {
   const [localSearchData, setLocalSearchData] = useState<string>(searchData);

   useEffect(() => {
      if (localSearchData.length > 4 || localSearchData.length === 0) {
         setSearchData(localSearchData);
      }
   }, [localSearchData, setSearchData]);

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchData(event.target.value);
   };
   return (
      <div style={{ padding: "0.5rem", display: "flex", justifyContent: "center" }}>
         <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={localSearchData}
            onChange={handleSearchChange}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon />
                  </InputAdornment>
               ),
            }}
            style={{ maxWidth: "90%" }}
         />
      </div>
   );
}
