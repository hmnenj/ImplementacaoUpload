import * as ImagePicker from 'expo-image-picker';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Desculpe, precisamos de permissões para acessar a galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            profileRef.current = uri;
        }
    };

    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
            Alert.alert('Sign Up', "Please fill all the fields!");
            return;
        }
        setLoading(true);

        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
        setLoading(false);

        console.log('got result: ', response);
        if (!response.success) {
            Alert.alert('Sign Up', response.msg);
        }
    };

    return (
        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12">

                {/* imagem topo */}
                <View className="items-center">
                    <Image style={{ height: hp(20) }} resizeMode='contain' source={require('../assets/images/register.png')} />
                </View>

                <View className="gap-10">
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>

                    {/* inputs */}
                    <View className="gap-4">

                        {/* Username */}
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Feather name="user" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Username'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        {/* Email */}
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        {/* Password */}
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => passwordRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Password'
                                secureTextEntry
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        {/* Imagem de Perfil */}
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{ height: hp(7) }}
                            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
                        >
                            <Feather name="image" size={hp(2.7)} color="gray" />
                            <Text style={{ fontSize: hp(2), color: profileImage ? 'black' : 'gray' }}>
                                {profileImage ? 'Imagem selecionada' : 'Selecionar imagem de perfil'}
                            </Text>
                        </TouchableOpacity>

                        {profileImage && (
                            <View className="items-center mt-4">
                                <Image
                                    source={{ uri: profileImage }}
                                    style={{ width: 150, height: 150, borderRadius: 75 }}
                                />
                            </View>
                        )}

                        {/*  submit button */}
                        <View>
                            {loading ? (
                                <View className="flex-row justify-center">
                                    <Loading size={hp(6.5)} />
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* sign up text  */}
                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Já possui uma conta? </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">Sign In</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}
