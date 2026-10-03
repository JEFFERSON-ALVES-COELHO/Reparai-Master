import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NewReportScreen from '../screens/NewReportScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyle = { headerTintColor: colors.primary, headerStyle: { backgroundColor: colors.bg }, headerShadowVisible: false };

function Tabs() {
    const icons = { Ocorrências: 'list', 'Nova ocorrência': 'add-circle', Perfil: 'person' };
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                ...headerStyle,
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.muted,
                tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
            })}
        >
            <Tab.Screen name="Ocorrências" component={HomeScreen} />
            <Tab.Screen name="Nova ocorrência" component={NewReportScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigation() {
    const { user } = useApp();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={headerStyle}>
                {user ? (
                    <>
                        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                        <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ title: 'Ocorrência' }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
