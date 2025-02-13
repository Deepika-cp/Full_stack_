package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Flight struct {
	ID          string  `json:"id,omitempty"`
	Number      string  `json:"number"`
	AirlineName string  `json:"airline_name"`
	Source      string  `json:"source"`
	Destination string  `json:"destination"`
	Capacity    int     `json:"capacity"`
	Price       float64 `json:"price"`
}

func createFlight(c *gin.Context) {
	var jbodyFlight Flight
	if err := c.BindJSON(&jbodyFlight); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server Error." + err.Error()})
		return
	}

	createdFlight := Flight{
		ID:          "001",
		Number:      "AI 845",
		AirlineName: "Air India",
		Source:      "Mumbai",
		Destination: "Abu Dhabi",
		Capacity:    300,
		Price:       5000.0,
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Flight Created Successfully", "flight": createdFlight})
}

func readAllFlights(c *gin.Context) {
	flights := []Flight{
		{ID: "001", Number: "AI 845", AirlineName: "Air India", Source: "Mumbai", Destination: "Abu Dhabi", Capacity: 300, Price: 5000.0},
		{ID: "002", Number: "GE 151", AirlineName: "Indigo", Source: "Hyderabad", Destination: "Bangalore", Capacity: 300, Price: 1000.0},
	}
	c.JSON(http.StatusOK, flights)
}

func readFlightById(c *gin.Context) {
	id := c.Param("id")
	flight := Flight{ID: id, Number: "AI 845", AirlineName: "Air India", Source: "Mumbai", Destination: "Abu Dhabi", Capacity: 300, Price: 5000.0}
	c.JSON(http.StatusOK, flight)
}

func updateFlight(c *gin.Context) {
	id := c.Param("id")
	var jbodyFlight Flight
	if err := c.BindJSON(&jbodyFlight); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server Error." + err.Error()})
		return
	}

	updatedFlight := Flight{
		ID:          id,
		Number:      jbodyFlight.Number,
		AirlineName: jbodyFlight.AirlineName,
		Source:      jbodyFlight.Source,
		Destination: jbodyFlight.Destination,
		Capacity:    jbodyFlight.Capacity,
		Price:       jbodyFlight.Price,
	}

	c.JSON(http.StatusOK, gin.H{"message": "Flight Updated Successfully", "flight": updatedFlight})
}

func deleteFlight(c *gin.Context) {
	id := c.Param("id")
	fmt.Println("Deleted Flight ID:", id)
	c.JSON(http.StatusOK, gin.H{"message": "Flight deleted successfully"})
}

func main() {
	r := gin.Default()

	// CORS Middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:          12 * time.Hour,
	}))

	// Routes
	r.POST("/flights", createFlight)
	r.GET("/flights", readAllFlights)
	r.GET("/flights/:id", readFlightById)
	r.PUT("/flights/:id", updateFlight)
	r.DELETE("/flights/:id", deleteFlight)

	// Server
	r.Run()
}