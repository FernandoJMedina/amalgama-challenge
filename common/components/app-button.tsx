import { Text, TouchableOpacity } from 'react-native';

type AppButtonProps = {
  disabled: boolean;
  onPress: () => void;
  title: string;
};

export function AppButton({ title, disabled, onPress }: AppButtonProps) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
