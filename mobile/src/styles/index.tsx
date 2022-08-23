import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const colors = {
  white: "#FFFFFF",
  lightGray: "#F2F2F2",
  mediumGray: "#9E9E9E",
  darkGray: "#263238",
  black: "#000000",
  primary: "#407BEE",
  secondary: "#33569B",
  bluePill: "#407BFF61",
  red: "#DF5753",
  borderGray: "#e1e1e1",
};

const base = StyleSheet.create({
  textRegular: { fontSize: 16, fontWeight: "400", textAlign: "center" },
  textBold: { fontSize: 26, fontWeight: "700", textAlign: "center" },
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2, // renders shadow in Android; available on View elements
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

const text = StyleSheet.create({
  title: {
    ...base.textBold,
    color: colors.darkGray,
    marginBottom: 15,
  },
  welcomeDescription: {
    ...base.textRegular,
    color: colors.mediumGray,
  },
  arrowButtonText: {
    ...base.textBold,
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.white,
    marginLeft: 20,
  },
  productCardTitle: {
    ...base.textBold,
    fontSize: 16,
    textAlign: "left",
    color: colors.black,
  },
  productCardCurrencySymbol: {
    ...base.textRegular,
    fontSize: 16,
    color: colors.mediumGray,
    marginTop: 5,
    marginRight: 5,
  },
  productCardPrice: {
    ...base.textBold,
    fontSize: 30,
    color: colors.primary,
  },
  productCardButton: {
    ...base.textBold,
    fontSize: 14,
    textTransform: "uppercase",
  },
  goBack: {
    ...base.textBold,
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.darkGray,
    marginLeft: 16,
  },
  productDetailsName: {
    ...base.textBold,
    fontSize: 30,
    color: colors.darkGray,
  },
  productDetailsDescription: {
    ...base.textRegular,
    fontSize: 16,
    color: colors.mediumGray,
    textAlign: "left",
    marginBottom: 20,
  },
  productCardButtonDelete: {
    color: colors.red,
  },
  productCardButtonEdit: {
    color: colors.mediumGray,
  },
});

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    ...base.card,
    height: "100%",
    borderRadius: 20,
  },
  welcomeImage: {
    width: 313,
    height: 225,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  arrowButton: {
    width: 290,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  arrowButtonContainer: {
    height: 50,
    width: 50,
    backgroundColor: colors.secondary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowButtonImage: {
    height: "35%",
  },
  scrollContainer: {
    padding: 20,
  },
  productCard: {
    ...base.card,
    marginBottom: 20,
  },
  productCardInfoContainer: {
    width: "100%",
    alignItems: "center",
  },
  productCardTopContainer: {
    borderBottomColor: colors.borderGray,
  },
  productCardTopContainerImage: {
    width: 180,
    height: 180,
  },
  productCardBottomContainer: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 30,
    textAlign: "left",
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
  },
  productCardPriceContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  productCardButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  productCardButton: {
    width: "40%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  productCardButtonDelete: {
    borderColor: colors.red,
  },
  productCardButtonEdit: {
    borderColor: colors.borderGray,
  },
  productFilterContainer: {
    ...base.card,
    height: 60,
    marginVertical: 12,
    paddingVertical: 10,
  },
  productFilterTextInput: {
    width: "90%",
    height: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGray,
  },
  productDetailsContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
  productDetailsCard: {
    ...base.card,
    height: "100%",
    backgroundColor: colors.white,
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 20,
    flexGrow: 1,
  },
  goBackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  productDetailsImgContainer: {
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginBottom: 20,
  },
  productDetailsImage: {
    height: 220,
    width: 220,
  },
  productDetailsNamePriceContainer: {
    marginBottom: 25,
  },
  productDetailsDescriptionContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    borderWidth: 0.45,
  },
  loginTextInput: {
    width: 290,
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  loginPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginPasswordVisibilityButton: {
    marginLeft: -45,
  },
  loginPasswordVisibilityImage: {
    height: 30,
    width: 30,
  },
});

const nav = StyleSheet.create({
  textLeft: {
    ...base.textBold,
    fontSize: 18,
    color: colors.white,
  },
  optionsContainer: {
    width: deviceWidth,
    //height: 120,
    color: colors.white,
    backgroundColor: colors.primary,
    //marginTop: 125,
    marginRight: -16,
    marginLeft: 20,
  },
  option: {
    paddingVertical: 5,
    paddingLeft: 15,
  },
  optionText: {
    color: colors.white,
  },
  optionTextActive: {
    fontWeight: "700",
  },
});

const tabbar = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.white,
  },
  pill: {
    width: 1,
    flexGrow: 1,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 30,
  },
  pillActive: {
    backgroundColor: colors.bluePill,
  },
  pillText: {
    ...base.textBold,
    fontSize: 16,
    color: colors.mediumGray,
  },
  pillTextActive: {
    color: colors.primary,
  },
});

const admin = StyleSheet.create({
  productCrudListNewProductButton: {
    height: 50,
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  productCrudListNewProductButtonText: {
    ...base.textBold,
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
  },
  productFormContainer: { padding: 20 },
  productFormCard: {
    ...base.card,
    alignItems: "flex-start",
    padding: 16,
  },
  productFormTextInput: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  productFormUploadButton: {
    width: "100%",
    height: 38,
    justifyContent: "center",
    backgroundColor: colors.mediumGray,
    borderRadius: 10,
    marginTop: 8,
  },
  productFormUploadButtonText: {
    ...base.textBold,
    fontSize: 14,
    color: colors.white,
    textTransform: "uppercase",
  },
  productFormUploadRestrictionText: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 8,
  },
  productFormTextInputDescription: {
    width: "100%",
    height: 200,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  productFormButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 8,
  },
  productFormButton: {
    width: "40%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  productFormButtonCancel: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  productFormButtonSave: {
    backgroundColor: colors.primary,
  },
  productFormButtonTextCancel: {
    ...base.textBold,
    fontSize: 16,
    color: colors.red,
    textTransform: "uppercase",
  },
  productFormButtonTextSave: {
    ...base.textBold,
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
  },
  productFormModalContainer: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: "center",
    backgroundColor: "#00000055",
  },
  productFormModalContent: {
    ...base.card,
    width: 300,
    marginTop: "50%",
    paddingVertical: 20,
  },
  productFormModalItem: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
});

export { colors, theme, text, nav, tabbar, admin };
