#include <napi.h>
#include <node_api.h>

double celsiusToFahrenheit(double celsius) { return (celsius * 9 / 5) - 32; }

double fahrenheitToCelsius(double fahrenheit) {
  return (fahrenheit + 32) * 5 / 9;
}

Napi::Number ConvertCelsiusToFahrenheit(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  double celsius = info[0].As<Napi::Number>().DoubleValue();
  double fahrenheit = celsiusToFahrenheit(celsius);
  return Napi::Number::New(env, fahrenheit);
}

Napi::Number ConvertFahrenheitToCelsius(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  double fahrenheit = info[0].As<Napi::Number>().DoubleValue();
  double celsius = fahrenheitToCelsius(fahrenheit);
  return Napi::Number::New(env, celsius);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "celsiusToFahrenheit"),
              Napi::Function::New(env, ConvertCelsiusToFahrenheit));
  exports.Set(Napi::String::New(env, "fahrenheitToCelsius"),
              Napi::Function::New(env, ConvertFahrenheitToCelsius));
  return exports;
}

NODE_API_MODULE(converter, Init)
