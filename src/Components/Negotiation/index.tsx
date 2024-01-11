import negotiationData from "./data.json";
import { Fragment } from "react";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery, useTheme } from "@mui/material";

export default function Negotiation({ searchData }: { searchData: string }) {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const filteredData = searchData
      ? negotiationData.filter((item) => item.question.toLowerCase().includes(searchData.toLowerCase()))
      : [];

   return (
      <Grid container>
         <Grid item xs={12}>
            {filteredData.length > 0 && (
               <Table aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        {isMobile ? null : (
                           <>
                              <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Question</TableCell>
                              <TableCell align="right">Gloomy</TableCell>
                              <TableCell align="right">Irritable</TableCell>
                              <TableCell align="right">Timid</TableCell>
                              <TableCell align="right">Upbeat</TableCell>
                           </>
                        )}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {filteredData.map((questionItem, questionIndex) => (
                        <Fragment key={questionIndex}>
                           {isMobile ? (
                              <TableRow>
                                 <TableCell>
                                    <strong>Question:</strong> {questionItem.question}
                                    <br />
                                    {questionItem.answers.map((answerItem, answerIndex) => (
                                       <Fragment key={answerIndex}>
                                          <strong>Answer: {answerItem.answer}</strong> 
                                          <br />
                                          <strong>Gloomy:</strong> {answerItem.gloomy}
                                          <br />
                                          <strong>Irritable:</strong> {answerItem.irritable}
                                          <br />
                                          <strong>Timid:</strong> {answerItem.timid}
                                          <br />
                                          <strong>Upbeat:</strong> {answerItem.upbeat}
                                          <br />
                                          <br />
                                       </Fragment>
                                    ))}
                                 </TableCell>
                              </TableRow>
                           ) : (
                              <Fragment>
                                 <TableRow>
                                    <TableCell
                                       component="th"
                                       scope="row"
                                       colSpan={5}
                                       style={{ backgroundColor: "#f5f5f5" }}
                                    >
                                       {questionItem.question}
                                    </TableCell>
                                 </TableRow>
                                 {questionItem.answers.map((answerItem, answerIndex) => (
                                    <TableRow key={answerIndex}>
                                       <TableCell component="th" scope="row">
                                          {answerItem.answer}
                                       </TableCell>
                                       <TableCell align="right">{answerItem.gloomy}</TableCell>
                                       <TableCell align="right">{answerItem.irritable}</TableCell>
                                       <TableCell align="right">{answerItem.timid}</TableCell>
                                       <TableCell align="right">{answerItem.upbeat}</TableCell>
                                    </TableRow>
                                 ))}
                              </Fragment>
                           )}
                        </Fragment>
                     ))}
                  </TableBody>
               </Table>
            )}
         </Grid>
      </Grid>
   );
}
