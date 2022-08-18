import { StyleSheet } from "react-native";

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
  welcomeTitle: {
    ...base.textBold,
    color: colors.darkGray,
    marginBottom: 15,
  },
  welcomeDescription: {
    ...base.textRegular,
    color: colors.mediumGray,
  },
  welcomeButtonText: {
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
  productDetailsGoBack: {
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
  welcomeButton: {
    width: 290,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  welcomeButtonArrowContainer: {
    height: 50,
    width: 50,
    backgroundColor: colors.secondary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeButtonArrowImage: {
    height: "30%",
    width: "30%",
  },
  scrollContainer: {
    padding: 20,
  },
  productCard: {
    ...base.card,
    marginBottom: 20,
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
    paddingVertical: 18,
    paddingHorizontal: 30,
    textAlign: "left",
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
  },
  productCardPriceContainer: {
    flexDirection: "row",
    marginTop: 10,
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
  productDetailsGoBackContainer: {
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
});

export { colors, theme, text };
