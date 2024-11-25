import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" 
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
      }}/>
      <Tabs.Screen name="create" 
      options={{
        title: 'Create Destination',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
      }}/>
      <Tabs.Screen name="edit" 
        options={{
          title: 'Edit Destination',
          href: {
            pathname: '/edit',
            params: {
                id: undefined,
            },
          },
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="edit" color={color} />,
        }}
      />
    </Tabs>
  );
}