# ReservationControllerApi

All URIs are relative to *https://goormthon-5.goorm.training*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /api/reservations | |
|[**list**](#list) | **GET** /api/reservations | |

# **create**
> CreateResponse create(createRequest)


### Example

```typescript
import {
    ReservationControllerApi,
    Configuration,
    CreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationControllerApi(configuration);

let createRequest: CreateRequest; //

const { status, data } = await apiInstance.create(
    createRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRequest** | **CreateRequest**|  | |


### Return type

**CreateResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list**
> Array<ListItemDto> list()


### Example

```typescript
import {
    ReservationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationControllerApi(configuration);

let userId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.list(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<ListItemDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

