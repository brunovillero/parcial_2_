import RNPickerSelect from 'react-native-picker-select';

export const DifficultyDropdown = ({ onValueChange, valueSet }: { onValueChange: (value: string) => void, valueSet: string }) => {
    return (
      <RNPickerSelect
        onValueChange={onValueChange}
        value={valueSet}
        items={[
          { label: 'Hard', value: 'hard' },
          { label: 'Medium', value: 'medium' },
          { label: 'Easy', value: 'easy' },
        ]}
      />
    );
  };