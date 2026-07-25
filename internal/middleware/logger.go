package middleware

import (
	"log"
	"net/http"
	"time"
)

func RequestLogger(NextHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(ResponseWriter http.ResponseWriter, Request *http.Request) {
		StartTime := time.Now()
		NextHandler.ServeHTTP(ResponseWriter, Request)
		ElapsedTime := time.Since(StartTime)
		log.Printf("[%s] %s %s - %s", Request.Method, Request.URL.Path, Request.RemoteAddr, ElapsedTime)
	})
}

func SecurityHeaders(NextHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(ResponseWriter http.ResponseWriter, Request *http.Request) {
		ResponseWriter.Header().Set("X-Content-Type-Options", "nosniff")
		ResponseWriter.Header().Set("X-Frame-Options", "DENY")
		ResponseWriter.Header().Set("Referrer-Policy", "no-referrer")
		NextHandler.ServeHTTP(ResponseWriter, Request)
	})
}

func CacheableStatic(NextHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(ResponseWriter http.ResponseWriter, Request *http.Request) {
		ResponseWriter.Header().Set("Cache-Control", "public, max-age=86400")
		NextHandler.ServeHTTP(ResponseWriter, Request)
	})
}
