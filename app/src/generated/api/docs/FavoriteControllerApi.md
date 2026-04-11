# FavoriteControllerApi

All URIs are relative to *https://goormthon-5.goorm.training*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/favorites | |
|[**create1**](#create1) | **POST** /api/favorites | |
|[**list1**](#list1) | **GET** /api/favorites | |
|[**status**](#status) | **GET** /api/favorites/status | |

# **_delete**
> ActionResponse _delete()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let userId: number; // (default to undefined)
let accommodationId: number; // (default to undefined)

const { status, data } = await apiInstance._delete(
    userId,
    accommodationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **accommodationId** | [**number**] |  | defaults to undefined|


### Return type

**ActionResponse**

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

# **create1**
> ActionResponse create1(createRequest)


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration,
    CreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let createRequest: CreateRequest; //

const { status, data } = await apiInstance.create1(
    createRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRequest** | **CreateRequest**|  | |


### Return type

**ActionResponse**

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

# **list1**
> Array<ListItemDto> list1()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.list1(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


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

# **status**
> StatusResponse status()


### Example

```typescript
import {
    FavoriteControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FavoriteControllerApi(configuration);

let userId: number; // (default to undefined)
let accommodationId: number; // (default to undefined)

const { status, data } = await apiInstance.status(
    userId,
    accommodationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **accommodationId** | [**number**] |  | defaults to undefined|


### Return type

**StatusResponse**

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

