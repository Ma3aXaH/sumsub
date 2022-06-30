## Sumsub sdk test

Versions:
- react-native - 0.68.2
- react - 17.0.2
- @sumsub/react-native-mobilesdk-module - 1.19.5

- Android buildTools - 31.0.0
- Android SDK - 31
- Kotlin - 1.6.10
- Android Gradle Plugin - 7.1.3
- Gradle - 7.3.3
- JDK - 14.0.2 (Open JDK)



Available scripts: 

### `npm start`

Starts metro bundler locally.

### `npm run android`

Build and install DEBUG version on connected device (emulator or physical).

## Error text:
```
{
    "nativeStackAndroid":
    [
        {
            "methodName": "<init>",
            "lineNumber": 472,
            "file": "SNSMobileSDK.kt",
            "class": "com.sumsub.sns.core.SNSMobileSDK$SDK"
        },
        {
            "methodName": "<init>",
            "lineNumber": 424,
            "file": "SNSMobileSDK.kt",
            "class": "com.sumsub.sns.core.SNSMobileSDK$SNSSDK"
        },
        {
            "methodName": "build",
            "lineNumber": 420,
            "file": "SNSMobileSDK.kt",
            "class": "com.sumsub.sns.core.SNSMobileSDK$Builder"
        },
        {
            "methodName": "run",
            "lineNumber": 258,
            "file": "SNSMobileSdkReactNativeModule.java",
            "class": "com.sumsub.msdk.plugins.reactnative.SNSMobileSdkReactNativeModule$1"
        },
        {
            "methodName": "handleCallback",
            "lineNumber": 938,
            "file": "Handler.java",
            "class": "android.os.Handler"
        },
        {
            "methodName": "dispatchMessage",
            "lineNumber": 99,
            "file": "Handler.java",
            "class": "android.os.Handler"
        },
        {
            "methodName": "dispatchMessage",
            "lineNumber": 27,
            "file": "MessageQueueThreadHandler.java",
            "class": "com.facebook.react.bridge.queue.MessageQueueThreadHandler"
        },
        {
            "methodName": "loop",
            "lineNumber": 223,
            "file": "Looper.java",
            "class": "android.os.Looper"
        },
        {
            "methodName": "main",
            "lineNumber": 7656,
            "file": "ActivityThread.java",
            "class": "android.app.ActivityThread"
        },
        {
            "methodName": "invoke",
            "lineNumber": -2,
            "file": "Method.java",
            "class": "java.lang.reflect.Method"
        },
        {
            "methodName": "run",
            "lineNumber": 592,
            "file": "RuntimeInit.java",
            "class": "com.android.internal.os.RuntimeInit$MethodAndArgsCaller"
        },
        {
            "methodName": "main",
            "lineNumber": 947,
            "file": "ZygoteInit.java",
            "class": "com.android.internal.os.ZygoteInit"
        }
    ],
    "userInfo": null,
    "message": null,
    "code": "EUNSPECIFIED",
    "line": 2580,
    "column": 45,
    "sourceURL": "http://10.0.2.2:8081/index.bundle?platform=android&dev=true&minify=false&app=com.sumsub&modulesOnly=false&runModule=true"
}
```
