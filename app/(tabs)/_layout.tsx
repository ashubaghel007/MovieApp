import { images } from "@/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        style={styles.bg}
        source={images.highlight}
        resizeMode="cover"
      >
        <Ionicons name={focused ? icon : icon} size={22} color={"#151312"} />
        <Text style={styles.label}> {title} </Text>
      </ImageBackground>
    );
  }
  return (
    <View style={styles.nonFocusedContainer}>
      <Ionicons name={focused ? icon : icon} size={22} color={"#A8B5DB"} />
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 114,
          height: 54,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 40,
          marginHorizontal: 15,
          marginBottom: 36,
          height: 54,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={"home"} title={"Home"} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={"search"} title={"Search"} />
            );
          },
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={"bookmark"} title={"Saved"} />
            );
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={"person"} title={"Profile"} />
            );
          },
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  bg: {
    marginTop: 15,
    width: 114,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
    flexDirection: "row", // icon + text side by side
    gap: 4, // spacing between icon and text
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#351112",
  },
  nonFocusedContainer: {
    marginTop: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default _Layout;
