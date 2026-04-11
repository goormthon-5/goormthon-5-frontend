# GuestBookControllerApi

All URIs are relative to *https://goormthon-5.goorm.training*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create2**](#create2) | **POST** /api/accommodations/{accommodationId}/guest-books | |
|[**list3**](#list3) | **GET** /api/accommodations/{accommodationId}/guest-books | |

# **create2**
> create2()


### Example

```typescript
import {
    GuestBookControllerApi,
    Configuration,
    CreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new GuestBookControllerApi(configuration);

let accommodationId: number; // (default to undefined)
let request: CreateRequest; // (default to undefined)
let image: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.create2(
    accommodationId,
    request,
    image
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accommodationId** | [**number**] |  | defaults to undefined|
| **request** | **CreateRequest** |  | defaults to undefined|
| **image** | [**File**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list3**
> Array<ListItemDto> list3()


### Example

```typescript
import {
    GuestBookControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GuestBookControllerApi(configuration);

let accommodationId: number; // (default to undefined)

const { status, data } = await apiInstance.list3(
    accommodationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accommodationId** | [**number**] |  | defaults to undefined|


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

