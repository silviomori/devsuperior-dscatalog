import { StyleSheet } from "react-native";

const text = StyleSheet.create({
  regular: { fontSize: 16, fontWeight: "400", textAlign: "center" },
  bold: { fontSize: 26, fontWeight: "700", textAlign: "center" },
});

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

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 2, // renders shadow in Android; available on View elements
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  welcomeImage: {
    width: 313,
    height: 225,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    ...text.bold,
    color: colors.darkGray,
    marginBottom: 15,
  },
  welcomeDescription: {
    ...text.regular,
    color: colors.mediumGray,
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
  welcomeButtonText: {
    ...text.bold,
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.white,
    marginLeft: 20,
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
});

export { colors, theme, text };
