import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  RefreshControl,
  SectionList,
  ListRenderItem,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import {PageContainer} from '..';
import {BKListItem, ListItemData} from './BKListItem';
import colors from '../../constant/colors';
import {SearchBar} from '@rneui/themed';
import typography from '../../constant/typography';

export interface BKListProps<T> {
  data: T[];
  multiSelection?: boolean;
  selection?: boolean;
  onPress?: (item: T) => void;
  onLoadMore?: () => void;
  hideLoadMore?: boolean;
  onSelectionUpdate?: (items: number[]) => void;
  keyExtractor?: ((item: T, index: number) => string) | undefined;
  parseListItemData?: (item: T) => ListItemData;
  onRefresh?: () => void;
  onDelete?: (item: T) => void;
  refreshing?: boolean;
  renderItem?: ListRenderItem<T> | null | undefined;
  emptyState?: () => JSX.Element | null;
  search?: boolean;
  onSearchTextChange?: (text: string) => void;
  onSearchSubmit?: (text: string) => void;
  listStyle?: ViewStyle;
  placeholder?: string;
}

export default function BKList<T extends {id: number}>({
  data,
  multiSelection = false,
  selection = false,
  onPress,
  onDelete,
  onLoadMore,
  hideLoadMore = false,
  onSelectionUpdate,
  parseListItemData,
  keyExtractor,
  onRefresh,
  refreshing,
  renderItem,
  emptyState,
  onSearchTextChange,
  onSearchSubmit,
  search,
  listStyle,
  placeholder,
}: BKListProps<T>) {
  const [selected, setSelected] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (onSelectionUpdate !== undefined) {
      onSelectionUpdate(selected);
    }
  }, [selected, onSelectionUpdate]);

  const setSelectedAction = (item: any) => {
    if (multiSelection) {
      setSelected(s =>
        selected.includes(item.id)
          ? s.filter(id => id !== item.id)
          : [...s, item.id],
      );
    } else {
      setSelected(s => (selected.includes(item.id) ? [] : [item.id]));
    }
  };

  return (
    <PageContainer style={styles.container}>
      {search && (
        <SearchBar
          placeholder={placeholder}
          round
          containerStyle={{
            backgroundColor: colors.primary,
            borderTopColor: colors.primary,
            borderBottomColor: colors.primary,
          }}
          inputContainerStyle={{backgroundColor: colors.background}}
          inputStyle={{color: '#000', ...typography.font}}
          onChangeText={text => {
            setSearchText(text);
            onSearchTextChange?.(text);
          }}
          value={searchText}
          onClear={() => {
            setSearchText('');
          }}
          returnKeyType="search"
          onSubmitEditing={() => {
            onSearchSubmit?.(searchText);
          }}
        />
      )}
      <SectionList
        style={listStyle}
        sections={[{data}]}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
        extraData={data}
        data={data}
        getItem={undefined}
        renderItem={
          renderItem
            ? renderItem
            : parseListItemData
            ? ({item}) => (
                <BKListItem
                  selected={selected.includes(item.id)}
                  item={parseListItemData(item)}
                  onPress={() => {
                    if (selection === true) {
                      setSelectedAction(item);
                    } else {
                      onPress?.(item);
                    }
                  }}
                  onDelete={onDelete ? () => onDelete(item) : undefined}
                />
              )
            : undefined
        }
        keyExtractor={
          keyExtractor
            ? keyExtractor
            : item => {
                return `${item.id}`;
              }
        }
        ListHeaderComponent={emptyState}
        ListFooterComponent={() => (
          <ListFooterComponent
            onLoadMore={onLoadMore}
            hideLoadMore={hideLoadMore}
          />
        )}
      />
    </PageContainer>
  );
}

type ListFooterProps = {
  onLoadMore?: () => void;
  hideLoadMore?: boolean;
};

const ListFooterComponent = ({onLoadMore, hideLoadMore}: ListFooterProps) => {
  return hideLoadMore || !onLoadMore ? null : (
    <TouchableOpacity onPress={onLoadMore}>
      <View style={styles.loadMoreView}>
        <Text style={styles.loadMoreText}>Load More</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 0,
    paddingVertical: 0,
  },
  loadMoreView: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    fontWeight: '400',
    fontSize: 16,
  },
});
