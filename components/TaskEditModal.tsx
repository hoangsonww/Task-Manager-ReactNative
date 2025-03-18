import React, { useState } from "react";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  useTheme,
} from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

// Import styles
import { styles } from "../styles/TaskAddModalStyles";

/**
 * Props for the TaskEditModal component.
 */
interface Props {
  visible: boolean;
  onClose: () => void;
  task: {
    id: number;
    text: string;
    color: string;
    dueDate: Date;
  };
  onEdit: (newText: string, newColor: string, newDueDate: Date) => void;
}

// Predefined colors for the user to choose from
const PRESET_COLORS = [
  "#ffffff", // white
  "#ffe4b5", // moccasin
  "#ffd700", // gold
  "#ff69b4", // hot pink
  "#b0e0e6", // powder blue
  "#90ee90", // light green
  "#cccccc", // light gray
  "#ffcccb", // light red
  "#8a2be2", // blue violet
  "#00ced1", // dark turquoise
  "#ff4500", // orange red
  "#32cd32", // lime green
];

/**
 * TaskEditModal component provides a modal to edit an existing task.
 */
export default function TaskEditModal({
  visible,
  onClose,
  task,
  onEdit,
}: Props) {
  const { colors } = useTheme();
  const [text, setText] = useState(task.text);
  const [date, setDate] = useState(new Date(task.dueDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [color, setColor] = useState(task.color);
  const [customColor, setCustomColor] = useState("");

  /**
   * Handle the edit task action.
   */
  const handleEditTask = () => {
    if (!text.trim()) return;
    let finalColor = color;
    if (customColor.trim().length >= 3 && customColor.startsWith("#")) {
      finalColor = customColor;
    }
    onEdit(text.trim(), finalColor, date);
    onClose();
  };

  /**
   * Open the date picker.
   */
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  /**
   * Handle the date change event.
   *
   * @param event - The event type
   * @param selectedDate - The selected date
   */
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false); // Android doesn't close the date picker automatically
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.surface },
        ]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text
              variant="titleLarge"
              style={[styles.title, { color: colors.onBackground }]}
            >
              Edit Task
            </Text>

            <TextInput
              label="Task Description"
              value={text}
              onChangeText={setText}
              style={styles.input}
              mode="outlined"
              placeholderTextColor={colors.onBackground}
              theme={{ colors: { onSurfaceVariant: colors.onBackground } }}
            />

            {/* DATE PICKER */}
            <Button
              mode="outlined"
              style={[styles.input, { alignSelf: "stretch" }]}
              onPress={openDatePicker}
              textColor={colors.onBackground}
            >
              Due Date: {date.toISOString().split("T")[0]}
            </Button>

            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  textColor={colors.onBackground}
                />
              </View>
            )}

            <Text style={[styles.label, { color: colors.onBackground }]}>
              Pick a Color
            </Text>
            <View style={styles.colorRow}>
              {PRESET_COLORS.map((c) => (
                <Button
                  key={c}
                  mode={color === c ? "contained" : "outlined"}
                  onPress={() => {
                    setColor(c);
                    setCustomColor("");
                  }}
                  style={[styles.colorButton, { backgroundColor: c }]}
                  labelStyle={{ color: "#000" }}
                >
                  {color === c ? "✓" : ""}
                </Button>
              ))}
            </View>
            <TextInput
              label="Or custom hex (#ffffff)"
              value={customColor}
              onChangeText={setCustomColor}
              style={styles.input}
              mode="outlined"
              placeholderTextColor={colors.onBackground}
              theme={{ colors: { onSurfaceVariant: colors.onBackground } }}
            />

            <View style={styles.row}>
              <Button onPress={onClose} style={styles.button}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleEditTask}
                style={styles.button}
              >
                Save
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
}
