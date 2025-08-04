package com.backend.Backend.Controller;

import com.backend.Backend.Service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/generate")
    public String generate(@RequestParam String prompt) {
        return geminiService.askGemini(prompt);
    }

}
