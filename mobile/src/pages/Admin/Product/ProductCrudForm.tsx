import { useNavigation } from "@react-navigation/native";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ICategory, IProduct } from "../../../@types";
import { admin, text, theme } from "../../../styles";
import { requestBackend } from "../../../util/requests";

import arrow_back from "../../../../assets/icons/arrow_left_blue.png";

interface IProps {
  setActiveScreen: Function;
  product?: IProduct;
}

const ProductCrudForm: React.FC<IProps> = ({ setActiveScreen }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>({});
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);

  useEffect(() => {
    requestBackend({ url: "/categories?sort=name" }).then((response) =>
      setCategories(response.data.content)
    );
  }, []);

  const handleCancel = () => {
    Alert.alert("Discard changes?", "Any unsaved changes will be lost.", [
      { text: "Go back", style: "cancel" },
      {
        text: "Discard changes",
        style: "destructive",
        onPress: () => {
          setActiveScreen("products");
        },
      },
    ]);
  };

  const handleSave = () => {
    setLoading(true);
    const config: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/products/${product.id}` : "/products",
      data: product,
      withCredentials: true,
    };
    requestBackend(config)
      .then((response) => {
        setActiveScreen("products");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setLoading(false);
  };

  return (
    <View style={admin.productFormContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={admin.productFormCard}>
          <Modal
            visible={showCategories}
            animationType="fade"
            transparent={true}
            presentationStyle="overFullScreen"
          >
            <View style={admin.productFormModalContainer}>
              <ScrollView contentContainerStyle={admin.productFormModalContent}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => {
                      product.categories = [cat];
                      setShowCategories(false);
                    }}
                    style={admin.productFormModalItem}
                  >
                    <Text>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>

          <TouchableOpacity
            style={theme.goBackContainer}
            onPress={() => handleCancel()}
          >
            <Image source={arrow_back} />
            <Text style={text.goBack}>Back</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Product name"
            style={admin.productFormTextInput}
            value={product.name}
            onChangeText={(e) => setProduct({ ...product, name: e })}
          />
          <TouchableOpacity
            onPress={() => setShowCategories(true)}
            style={admin.productFormTextInput}
          >
            <Text
              style={product?.categories?.[0] == null && { color: "#9e9e9e" }}
            >
              {product?.categories?.[0] == null
                ? "Select category..."
                : product.categories[0].name}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Price"
            style={admin.productFormTextInput}
            value={String(product.price ?? "")}
            onChangeText={(e) =>
              setProduct({ ...product, price: parseFloat(e) })
            }
          />
          <TouchableOpacity style={admin.productFormUploadButton}>
            <Text style={admin.productFormUploadButtonText}>Upload image</Text>
          </TouchableOpacity>
          <Text style={admin.productFormUploadRestrictionText}>
            Images must be in JPG or PNG format and must not exceed 5 mb.
          </Text>
          <TextInput
            multiline
            placeholder="Description"
            style={admin.productFormTextInputDescription}
            value={product.description}
            onChangeText={(e) => setProduct({ ...product, description: e })}
          />
          <View style={admin.productFormButtonsContainer}>
            <TouchableOpacity
              style={[admin.productFormButton, admin.productFormButtonCancel]}
              onPress={() => handleCancel()}
            >
              <Text style={admin.productFormButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[admin.productFormButton, admin.productFormButtonSave]}
              onPress={() => {
                handleSave();
              }}
            >
              <Text style={admin.productFormButtonTextSave}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductCrudForm;
