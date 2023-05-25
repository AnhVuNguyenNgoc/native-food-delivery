import * as Sentry from '@sentry/react-native';
import {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {
  FilterModal,
  HorizontalFoodCard,
  VerticalFoodCard,
} from '../../components';
import {COLORS, FONTS, SIZES, dummyData, icons} from '../../constants';

const Section = ({title, onPress, children}) => {
  return (
    <View>
      <View style={styles.section}>
        <Text style={{flex: 1, fontWeight: 'bold', fontSize: 17}}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Error Sentry');
            Sentry.captureException(new Error('First error'));
          }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 17,
              color: COLORS.primary,
            }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};
const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const [selectedMenuType, setSelectedMenuType] = useState(1);

  const [menuList, setMenuList] = useState([]);

  const [recommends, setRecommends] = useState([]);

  const [populars, setPopular] = useState([]);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleChangeCategory = useCallback((categoryId, menuTypeId) => {
    // Retrieve the recommend menu
    let selectedRecommend = dummyData.menu.find(
      item => item.name === 'Recommended',
    );

    // Retrieve the recommend menu
    let selectedPopular = dummyData.menu.find(item => item.name === 'Popular');

    //Find the menu based on id
    let selectedMenu = dummyData.menu.find(item => item.id === menuTypeId);

    setPopular(
      selectedPopular?.list.filter(item =>
        item.categories.includes(categoryId),
      ),
    );

    // set the recommend based on the recommedn Section
    setRecommends(
      selectedRecommend?.list.filter(item =>
        item.categories.includes(categoryId),
      ),
    );
    // set menu based on the categoryId
    setMenuList(
      selectedMenu?.list.filter(item => item.categories.includes(categoryId)),
    );
  }, []);

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, [handleChangeCategory, selectedCategoryId, selectedMenuType]);

  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          height: 40,
          backgroundColor: COLORS.lightGray2,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          paddingHorizontal: SIZES.radius,
        }}>
        <Image
          source={icons.search}
          style={{width: 20, height: 20, tintColor: COLORS.black}}
        />

        {/* TextInput */}

        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="search food "
        />

        {/* Filter Button */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{width: 20, height: 20, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{marginLeft: SIZES.padding}}
              onPress={() => {
                setSelectedMenuType(item.id);
                handleChangeCategory(selectedCategoryId, item.id);
              }}>
              <Text
                style={{
                  color:
                    selectedMenuType === item.id
                      ? COLORS.primary
                      : COLORS.black,
                  ...FONTS.h3,
                  fontWeight: '500',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderRecommendSection = () => {
    return (
      <Section
        title="Recommended"
        onPress={() => {
          console.log('Error Sentry');
          // Sentry.captureException(new Error('First error'));
        }}>
        <FlatList
          data={populars}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  width: SIZES.width * 0.85,
                  height: 180,
                  marginLeft: index === 0 ? SIZES.padding : 18,
                }}
                imageStyle={styles.imageStyle}
                item={item}
                onPress={() => console.log('HorizontalFoodCard')}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderPopularSection = () => {
    return (
      <Section title="Popular" onPress={() => console.log('Popular')}>
        <FlatList
          data={recommends}
          horizontal
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 18,
                  padding: 18,
                  marginRight: index == populars.length - 1 ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() => console.log('Popular')}
                isLove={true}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderFoodCategories = () => {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[
                styles.category,
                {
                  marginRight:
                    index === dummyData.categories.length - 1
                      ? SIZES.padding
                      : 0,
                  marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                  backgroundColor:
                    selectedCategoryId === item.id
                      ? COLORS.primary
                      : COLORS.lightGray2,
                },
              ]}
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategory(item.id, selectedMenuType);
              }}>
              <Image
                source={item.icon}
                style={{width: 50, height: 50, marginTop: 5}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  color: selectedCategoryId === item.id ? COLORS.white : null,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {renderSearch()}

      {/* FilterModal */}

      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View>
              {/* Food Categories */}
              {renderFoodCategories()}

              {/* Popular Section */}
              {renderPopularSection()}

              {/* Recommended Section */}
              {renderRecommendSection()}

              {/* Menu Section */}
              {renderMenuTypes()}
            </View>
          );
        }}
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        renderItem={({item, index}) => {
          return (
            <HorizontalFoodCard
              containerStyle={styles.containerStyle}
              imageStyle={styles.imageStyle}
              item={item}
              onPress={() => console.log('HorizontalFoodCard')}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 130,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },
  imageStyle: {
    marginTop: 20,
    height: 110,
    width: 110,
  },
  section: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: 30,
    marginBottom: 20,
  },
  category: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 55,
    marginTop: SIZES.padding,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
});

export default Home;
