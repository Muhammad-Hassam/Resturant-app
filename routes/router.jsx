import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/home";
import Signup from "../components/signup";
import Login from "../components/login";
import Additem from "../components/addFood";
import Breakfast from '../components/breakfast';
import Lunch from '../components/lunch';
import Dinner from "../components/dinner";
import CheckOut from "../components/checkout";
import OrderHistory from "../components/ordershistory";
import Orders from "../components/orders";
import Admindashboard from '../components/admindashboard';
import Allitems from '../components/allitems'
import Carts from '../components/carts';
import Head from "../components/header";
import Adminorders from '../components/adminoorders';
import Kitchenmanager from '../components/kitchenmanager';
import Rider from '../components/rider'
import Orderdetails from '../components/ordersdetail';
const Stack=createStackNavigator();

export default function Navigations(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{headerShown: false,}}/>
            <Stack.Screen name="login" component={Login} options={{headerShown: false,}}/>
            <Stack.Screen name="signup" component={Signup} options={{headerShown: false,}}/>
            <Stack.Screen name="Additem" component={Additem} options={{headerShown: false,}}/>
            <Stack.Screen name="Breakfast" component={Breakfast} options={{headerShown: false,}}/>
            <Stack.Screen name="Lunch" component={Lunch} options={{headerShown: false,}}/>
            <Stack.Screen name="Dinner" component={Dinner} options={{headerShown: false,}}/>
            <Stack.Screen name="CheckOut" component={CheckOut} options={{headerShown: false,}}/>
            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{headerShown: false,}}/>
            <Stack.Screen name="Orders" component={Orders} options={{headerShown: false,}}/>
            <Stack.Screen name="Allitems" component={Allitems} options={{headerShown: false,}}/>
            <Stack.Screen name="Carts" component={Carts} options={{headerShown: false,}}/>
            <Stack.Screen name="Head" component={Head} options={{headerShown: false,}}/>
            <Stack.Screen name="Admindashboard" component={Admindashboard} options={{headerShown: false,}}/>
            <Stack.Screen name="Orderdetails" component={Orderdetails} options={{headerShown: false,}}/>
            <Stack.Screen name="Adminorders" component={Adminorders} options={{headerShown: false,}}/>
            <Stack.Screen name="Kitchenmanager" component={Kitchenmanager} options={{headerShown: false,}}/>
            <Stack.Screen name="Rider" component={Rider} options={{headerShown: false,}}/>
            </Stack.Navigator>
        </NavigationContainer>
        );
}
