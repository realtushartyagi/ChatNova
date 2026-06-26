import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from '../configs/openai.js'


// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

         // Check credits
        if(req.user.credits < 1){
            return res.json({success: false, message: "You don't have enough credits to use this feature"})
        }

        const {chatId, prompt, images, attachments} = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role: "user", content: prompt, timestamp: Date.now(), isImage: false, attachments: attachments || []})

        const useVision = images && images.length > 0;
        const modelToUse = useVision ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile";

        const messageContent = useVision 
            ? [
                { type: "text", text: prompt },
                ...images.map(imgData => ({
                    type: "image_url",
                    image_url: { url: imgData }
                }))
              ]
            : prompt;

        const apiMessages = [
            { role: "system", content: "You are Nova, an intelligent AI assistant. Use Markdown for formatting." }
        ];

        chat.messages.forEach((msg, index) => {
            if (msg.isImage) return;
            
            if (index === chat.messages.length - 1) {
                apiMessages.push({ role: "user", content: messageContent });
            } else {
                apiMessages.push({ role: msg.role === "assistant" ? "assistant" : "user", content: msg.content });
            }
        });

        const { choices } = await openai.chat.completions.create({
            model: modelToUse,
            messages: apiMessages,
        });

    const reply = {...choices[0].message, timestamp: Date.now(), isImage: false}
    res.json({success: true, reply})

    chat.messages.push(reply)
    await chat.save()
    await User.updateOne({_id: userId}, {$inc: {credits: -1}})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        // Check credits
        if(req.user.credits < 2){
            return res.json({success: false, message: "You don't have enough credits to use this feature"})
        }
        const {prompt, chatId, isPublished} = req.body
        // Find chat
        const chat = await Chat.findOne({userId, _id: chatId})

         // Push user message
         chat.messages.push({
            role: "user", 
            content: prompt, 
            timestamp: Date.now(), 
            isImage: false});

        // Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt)

        // Construct ImageKit AI generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

        // Trigger generation by fetching from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"})

        // Convert to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;

        // Upload to ImageKit Media Library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt"
        })

        const reply = {
                role: 'assistant',
                content: uploadResponse.url,
                timestamp: Date.now(), 
                isImage: true,
                isPublished
        }

         res.json({success: true, reply})

         chat.messages.push(reply)
         await chat.save()

          await User.updateOne({_id: userId}, {$inc: {credits: -2}})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}