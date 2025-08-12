import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
type ProfileAvatarProps = {
  profile: string;
  size?: number;
};
const ProfileAvatar: React.FC<ProfileAvatarProps> = props => {
  return (
    <View style={styles.imageWrapper}>
      <View
        style={[
          styles.imageContainer,
          {
            width: props.size ?? 96,
            height: props.size ?? 96,
            borderRadius: (props.size ?? 96) / 2,
          },
        ]}
      >
        <Image source={{ uri: props.profile }} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
export default ProfileAvatar;
