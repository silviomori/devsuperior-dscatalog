import { TextInput, View } from "react-native";
import { theme } from "../styles";

interface IProductFilterProps {
  placeholder: string;
  value: string;
  onChangeText: (newValue: string) => void;
}

const ProductFilter: React.FC<IProductFilterProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={theme.productFilterContainer}>
      <TextInput
        style={theme.productFilterTextInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(newValue) => onChangeText(newValue)}
      ></TextInput>
    </View>
  );
};

export default ProductFilter;
