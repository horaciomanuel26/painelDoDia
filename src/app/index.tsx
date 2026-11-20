import { View } from "react-native";
import  {Menu} from "@/components/Menu";
import  {Lista}  from "@/components/Lista";
import  {Botao}  from "@/components/Botao";

export default function Index() {
  return (
    <View>
      <Menu />
      <Lista />
      <Botao />
    </View>
  );
}