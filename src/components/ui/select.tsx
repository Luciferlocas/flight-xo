import { ThemedText } from "@/components/themed-text";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  registerOption: (value: string, label: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);
const HiddenContext = createContext<boolean>(false);

export const Select = ({
  value,
  onValueChange,
  children,
  placeholder = "Select...",
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Record<string, string>>({});

  const registerOption = React.useCallback((val: string, label: string) => {
    setOptions((prev) => {
      if (prev[val] !== label) {
        return { ...prev, [val]: label };
      }
      return prev;
    });
  }, []);

  const selectedLabel = options[value];

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, registerOption }}
    >
      <View style={[styles.container, { zIndex: open ? 100 : 1 }]}>
        <TouchableOpacity
          style={[styles.trigger, open && styles.triggerOpen]}
          onPress={() => setOpen(!open)}
          activeOpacity={0.7}
        >
          <ThemedText
            style={[
              styles.triggerText,
              !selectedLabel && styles.placeholderText,
            ]}
          >
            {selectedLabel || placeholder}
          </ThemedText>
          {open ? (
            <ChevronUp size={24} color="#000" />
          ) : (
            <ChevronDown size={24} color="#000" />
          )}
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownContent}>
            <ScrollView
              bounces={false}
              nestedScrollEnabled
              showsVerticalScrollIndicator={true}
              style={styles.dropdownScroll}
            >
              {children}
            </ScrollView>
          </View>
        )}

        <HiddenContext.Provider value={true}>
          <View style={{ display: "none" }}>{children}</View>
        </HiddenContext.Provider>
      </View>
    </SelectContext.Provider>
  );
};

export const Option = ({ label, value }: { label: string; value: string }) => {
  const context = useContext(SelectContext);
  const isHidden = useContext(HiddenContext);

  if (!context) throw new Error("Option must be used within Select");

  const {
    value: selectedValue,
    onValueChange,
    setOpen,
    registerOption,
  } = context;
  const isSelected = selectedValue === value;

  React.useEffect(() => {
    registerOption(value, label);
  }, [value, label, registerOption]);

  if (isHidden) return null;

  return (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.optionSelected]}
      onPress={() => {
        onValueChange(value);
        setOpen(false);
      }}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.optionText}>{label}</ThemedText>
      {isSelected && <Check size={20} color="#000" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  triggerOpen: {
    borderBottomWidth: 0,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  placeholderText: {
    color: "#000",
    opacity: 0.6,
  },
  dropdownContent: {
    backgroundColor: "#fff",
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  optionSelected: {
    backgroundColor: "#FFD700",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
