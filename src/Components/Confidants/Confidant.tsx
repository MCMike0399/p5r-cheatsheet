import { Fragment } from "react";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery, useTheme } from "@mui/material";

type Props = {
   name: string;
   data: {
      rank: string;
      responses: {
         response: string;
         values: string[];
      }[];
   }[];
   searchData: string;
};

export default function Confidant({ name, data, searchData }: Props) {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const filteredData = searchData
      ? data.flatMap((rankItem) =>
           rankItem.responses
              .filter((responseItem) =>
                 responseItem.values.some((value) => value.toLowerCase().includes(searchData.toLowerCase()))
              )
              .map((responseItem) => ({ ...rankItem, responses: [responseItem] }))
        )
      : [];

   return (
      <Grid item xs={12}>
         <Table>
            <TableHead>
               <TableRow>
                  {isMobile ? null : (
                     <>
                        <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Rank</TableCell>
                        <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Response</TableCell>
                     </>
                  )}
               </TableRow>
            </TableHead>
            <TableBody>
               {filteredData.map((rankItem, rankIndex) => (
                  <Fragment key={rankIndex}>
                     {rankItem.responses.map((responseItem, responseIndex) => (
                        <TableRow key={responseIndex}>
                           {isMobile ? (
                              <TableCell>
                                 <strong>Name:</strong> {name}
                                 <br />
                                 <strong>Rank:</strong> {rankItem.rank}
                                 <br />
                                 <strong>Response:</strong> {responseItem.response}
                                 <br />
                                 {responseItem.values.map((value, valueIndex) => (
                                    <span key={valueIndex}>
                                       {value}
                                       <br />
                                    </span>
                                 ))}
                              </TableCell>
                           ) : (
                              <>
                                 <TableCell>{rankItem.rank}</TableCell>
                                 <TableCell>
                                    {responseItem.response}
                                    <br />
                                    {responseItem.values.join(", ")}
                                 </TableCell>
                              </>
                           )}
                        </TableRow>
                     ))}
                  </Fragment>
               ))}
            </TableBody>
         </Table>
      </Grid>
   );
}
