import { Grid } from "@mui/material";
import Confidant from "./Confidant";
import Ann_Takamaki from "./Ann_Takamaki.json";
import Chihaya_Mifune from "./Chihaya_Mifuine.json";
import Futuaba_Sakura from "./Futaba_Sakura.json";
import Goro_Akechi from "./Goro_Akechi.json";
import Haru_Okumura from "./Haru_Okumura.json";
import Hifumi_Togo from "./Hifumi_Togo.json";
import Ichiko_Ohya from "./Ichiko_Ohya.json";
import Kasumi_Yoshizawa from "./Kasumi_Yoshizawa.json";
import Makoto_Nijima from "./Makoto_Nijima.json";
import Munehisa_Iwai from "./Munehisa_Iwai.json";
import Ryuji_Sakamoto from "./Ryuji_Sakamoto.json";
import Sadayo_Kawakami from "./Sadayo_Kawakami.json";
import Shinya_Oda from "./Shinya_Oda.json";
import Sojiro_Sakura from "./Sojiro_Sakura.json";
import Tae_Takemi from "./Tae_Takemi.json";
import Takuto_Maruki from "./Takuto_Maruki.json";
import Toranosuke_Yoshida from "./Toranosuke_Yoshida.json";
import Yusuke_Kitagawa from "./Yusuke_Kitagawa.json";
import Yuuki_Mishima from "./Yuuki_Mishima.json";

type Props = {
   searchData: string;
};

export default function Confidants({ searchData }: Props) {
   return (
      <Grid container>
         <Confidant name="Ann Takamaki" data={Ann_Takamaki} searchData={searchData} />
         <Confidant name="Chihaya Mifune" data={Chihaya_Mifune} searchData={searchData} />
         <Confidant name="Futaba Sakura" data={Futuaba_Sakura} searchData={searchData} />
         <Confidant name="Goro Akechi" data={Goro_Akechi} searchData={searchData} />
         <Confidant name="Haru Okumura" data={Haru_Okumura} searchData={searchData} />
         <Confidant name="Hifumi Togo" data={Hifumi_Togo} searchData={searchData} />
         <Confidant name="Ichiko Ohya" data={Ichiko_Ohya} searchData={searchData} />
         <Confidant name="Kasumi Yoshizawa" data={Kasumi_Yoshizawa} searchData={searchData} />
         <Confidant name="Makoto Nijima" data={Makoto_Nijima} searchData={searchData} />
         <Confidant name="Munehisa Iwai" data={Munehisa_Iwai} searchData={searchData} />
         <Confidant name="Ryuji Sakamoto" data={Ryuji_Sakamoto} searchData={searchData} />
         <Confidant name="Sadayo Kawakami" data={Sadayo_Kawakami} searchData={searchData} />
         <Confidant name="Shinya Oda" data={Shinya_Oda} searchData={searchData} />
         <Confidant name="Sojiro Sakura" data={Sojiro_Sakura} searchData={searchData} />
         <Confidant name="Tae Takemi" data={Tae_Takemi} searchData={searchData} />
         <Confidant name="Takuto Maruki" data={Takuto_Maruki} searchData={searchData} />
         <Confidant name="Toranosuke Yoshida" data={Toranosuke_Yoshida} searchData={searchData} />
         <Confidant name="Yusuke Kitagawa" data={Yusuke_Kitagawa} searchData={searchData} />
         <Confidant name="Yuuki Mishima" data={Yuuki_Mishima} searchData={searchData} />
      </Grid>
   );
}
