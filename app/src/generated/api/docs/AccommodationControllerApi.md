# AccommodationControllerApi

All URIs are relative to *https://goormthon-5.goorm.training*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**aiRewrite**](#airewrite) | **POST** /api/accommodations/{accommodationId}/ai-rewrite | |
|[**detail**](#detail) | **GET** /api/accommodations/{accommodationId} | |
|[**list2**](#list2) | **GET** /api/accommodations | |
|[**search**](#search) | **GET** /api/accommodations/search | |

# **aiRewrite**
> RewriteResponse aiRewrite()


### Example

```typescript
import {
    AccommodationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccommodationControllerApi(configuration);

let accommodationId: number; // (default to undefined)

const { status, data } = await apiInstance.aiRewrite(
    accommodationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accommodationId** | [**number**] |  | defaults to undefined|


### Return type

**RewriteResponse**

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

# **detail**
> DetailDto detail()


### Example

```typescript
import {
    AccommodationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccommodationControllerApi(configuration);

let accommodationId: number; // (default to undefined)

const { status, data } = await apiInstance.detail(
    accommodationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accommodationId** | [**number**] |  | defaults to undefined|


### Return type

**DetailDto**

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

# **list2**
> Array<ListItemDto> list2()


### Example

```typescript
import {
    AccommodationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccommodationControllerApi(configuration);

let areaGroup: Array<string>; // (optional) (default to undefined)
let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.list2(
    areaGroup,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **areaGroup** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


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

# **search**
> Array<ListItemDto> search()


### Example

```typescript
import {
    AccommodationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccommodationControllerApi(configuration);

let keyword: string; // (optional) (default to undefined)
let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.search(
    keyword,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keyword** | [**string**] |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


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

