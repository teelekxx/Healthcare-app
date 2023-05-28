import React from "react";
import { SafeAreaView, Button, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { BlueCircleButton } from "../../components/components/index.style";
import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { useInfiniteQuery } from "react-query";

import {
  NotificationsTitle,
  NotificationsContainer,
  TitleContainer,
  NotificationsScrollable,
  NotificationBlock,
  NotificationsName,
  NotificationsMassage,
  NotificationsDate,
  NativeButton,
  NativeText,
} from "./index.style";

import NotificationApi from "../../api/notification";
import { useDispatch, useSelector } from "react-redux";

function NotificationsScreen({ navigation }) {
  // const auth = useSelector((state) => state.Authentication);

  const chatNotifications = [
    { Name: "Collin Doe", Massage: "Hello", Date: "24/02/2023" },
    { Name: "Bill Doe", Massage: "How are you?", Date: "22/02/2023" },
  ];
  const EmergencyNotifications = [
    { Name: "We found an Ambulance!", Massage: "", Date: "20/02/2023" },
    { Name: "Order Successfully", Massage: "", Date: "20/02/2023" },
  ];

  const fetchProjects = async ({ pageParam = 1 }) => {
    const token = await AsyncStorage.getItem("token");
    const res = await NotificationApi.getNotificationByUserId({
      body: {
        limit: 10,
        page: pageParam || 1,
      },
      token,
    });

    if (res.isOk) {
      return res;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("notifications", fetchProjects, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page >= lastPage.totalPages) {
        return undefined; // Stop pagination if last page reached
      }

      return lastPage.page + 1;
    },
    onError: (error) => {
      console.log(error);
      // toast.show(error.toString(), {
      //   type: "danger",
      // });
    },
  });

  return (
    <NotificationsContainer>
      <TitleContainer>
        <BlueCircleButton onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.white}
            size={20}
          />
        </BlueCircleButton>
        <NotificationsTitle>Notification</NotificationsTitle>
      </TitleContainer>
      <SafeAreaView>
        {data && (
          <SafeAreaView>
            <NotificationsScrollable>
              {data.pages.map((val, index) => {
                return (
                  <View>
                    {val.notification.map((i) => {
                      let date = new Date(i.createdAt);
                      const day = date.getDate();

                      // Get month (Note: Months are zero-based, so January is 0 and December is 11)
                      const month = date.getMonth() + 1; // Adding 1 to adjust for zero-based months

                      // Get year
                      const year = date.getFullYear();

                      let formattedDate = date.toLocaleTimeString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      // formattedDate += `${day}/${month}/${year}`;
                      return (
                        <NotificationBlock
                          // onPress={() =>
                          //   navigation.navigate("Chatting", {
                          //     paramKey: val.Name,
                          //   })
                          // }
                          key={index}
                        >
                          <NotificationsName>{i.title}</NotificationsName>
                          <NotificationsMassage>{i.body}</NotificationsMassage>
                          {/* <NotificationsDate>
                            {i.createdAt
                              .toDate()
                              .toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                          </NotificationsDate> */}
                          <NotificationsDate>{formattedDate}</NotificationsDate>
                        </NotificationBlock>
                      );
                    })}
                  </View>
                );
              })}
              <NativeButton
                title="Load More"
                onPress={fetchNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  backgroundColor:
                    !hasNextPage || isFetchingNextPage
                      ? Colors.grey
                      : Colors.blue,
                }}
              >
                <NativeText>Load more</NativeText>
              </NativeButton>
            </NotificationsScrollable>
          </SafeAreaView>
        )}
      </SafeAreaView>
    </NotificationsContainer>
  );
}
export default NotificationsScreen;
