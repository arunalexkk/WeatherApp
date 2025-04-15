// Description: A simple action bar component that displays a message when visible
import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface ActionBarProps {
  message: string;
  visible: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};



export default ActionBar;
