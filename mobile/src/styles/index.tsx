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
    borderBottomColor: colors.lightGray,
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
});

export { colors, theme, text };
