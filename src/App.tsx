import { useState } from "react";
import { Grid } from "@mui/material";
import SearchBar from "./Components/SearchBar";
import Negotiation from "./Components/Negotiation";
import Confidants from "./Components/Confidants";

export default function App() {
   const [searchData, setSearchData] = useState<string>("");

   return (
      <Grid container sx={{ height: "100vh", overflowY: "hidden" }}>
         <Grid item xs={12} sx={{ height: "10%" }}>
            <SearchBar searchData={searchData} setSearchData={setSearchData} />
         </Grid>
         <Grid item xs={12} sx={{ height: "90%" }}>
            <Confidants searchData={searchData} />
            <Negotiation searchData={searchData} />
         </Grid>
      </Grid>
   );
}
