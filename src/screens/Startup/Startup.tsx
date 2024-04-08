/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import type { ApplicationScreenProps } from '@/types/navigation';
import { MMKV } from 'react-native-mmkv';

function Startup({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts, colors } = useTheme();
  const storage = new MMKV();
  const userName = storage.getString('username');
  const { t } = useTranslation(['startup']);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ['startup'],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  useEffect(() => {
    if (userName) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthorizedStack' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'UnAuthorizedStack' }],
      });
    }
  }, [userName, navigation, isSuccess]);

  return (
    <SafeScreen>
      <View style={[layout.flex_1, layout.col, layout.itemsCenter, layout.justifyCenter]}>
        <Brand />
        {isFetching && (
          <ActivityIndicator
            size="large"
            style={[gutters.marginBottom_20]}
            color={colors.linearGradientColor}
          />
        )}
        {isError && <Text style={[fonts.size_16, fonts.red500]}>{t('startup:error')}</Text>}
      </View>
    </SafeScreen>
  );
}

export default Startup;
