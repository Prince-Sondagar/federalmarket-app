import React from "react";
import { ActivityIndicator, View } from "react-native";

function Loader({ size, color }: { size?: number, color?: string }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator
                size={size ? size : 20}
                color={color ? color : "#fff"}
            />
        </View>
    )
}
export default Loader;