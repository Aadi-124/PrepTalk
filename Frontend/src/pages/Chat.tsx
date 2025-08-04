// // import React, { useState, useRef, useEffect } from 'react';
// // import { Send, Smile, MoreVertical, Bot, User } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Card } from '@/components/ui/card';
// // import { ScrollArea } from '@/components/ui/scroll-area';
// // import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// // import { AppLayout } from '@/layouts/AppLayout';
// // import { sendPrompt } from '@/APIService/PrepTalkAPI';
// // import { toast } from 'sonner';

// // interface Message {
// //   id: string;
// //   content: string;
// //   sender: 'user' | 'ai';
// //   timestamp: Date;
// // }

// // interface Conversation {
// //   id: string;
// //   name: string;
// //   lastMessage: string;
// //   timestamp: Date;
// //   unread?: boolean;
// // }

// // const mockConversations: Conversation[] = [
// //   {
// //     id: '1',
// //     name: 'Technical Interview Prep',
// //     lastMessage: 'Let\'s practice some React questions',
// //     timestamp: new Date(),
// //     unread: true
// //   },
// //   {
// //     id: '2',
// //     name: 'Behavioral Questions',
// //     lastMessage: 'Tell me about a challenging project...',
// //     timestamp: new Date(Date.now() - 3600000),
// //   },
// //   {
// //     id: '3',
// //     name: 'System Design Practice',
// //     lastMessage: 'How would you design a chat system?',
// //     timestamp: new Date(Date.now() - 7200000),
// //   }
// // ];

// // const mockMessages: Message[] = [
// //   {
// //     id: '1',
// //     content: 'Hello! I\'m your AI Interview Coach. I\'m here to help you practice and improve your interview skills. What type of interview would you like to practice today?',
// //     sender: 'ai',
// //     timestamp: new Date(Date.now() - 1800000)
// //   },
// //   {
// //     id: '2',
// //     content: 'Hi! I\'d like to practice for a frontend developer position, specifically React.',
// //     sender: 'user',
// //     timestamp: new Date(Date.now() - 1740000)
// //   },
// //   {
// //     id: '3',
// //     content: 'Perfect! Let\'s start with some technical React questions. Can you explain the difference between controlled and uncontrolled components in React?',
// //     sender: 'ai',
// //     timestamp: new Date(Date.now() - 1680000)
// //   },
// //   {
// //     id: '4',
// //     content: 'Controlled components are those where form data is handled by the React component through state, while uncontrolled components store their own state internally.',
// //     sender: 'user',
// //     timestamp: new Date(Date.now() - 1620000)
// //   }
// // ];

// // export const Chat = () => {
// //   const [activeConversation, setActiveConversation] = useState('1');
// //   const [message, setMessage] = useState('');
// //   const [messages, setMessages] = useState<Message[]>(mockMessages);
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const handleSendMessage = () => {
// //     if (!message.trim()) return;
   
// //     const newMessage: Message = {
// //       id: Date.now().toString(),
// //       content: message,
// //       sender: 'user',
// //       timestamp: new Date()
// //     };

// //     setMessages(prev => [...prev, newMessage]);
// //     setMessage('');


// //      sendPrompt(message).then((response)=>{
// //        setTimeout(() => {
// //       const aiResponse: Message = {
// //         id: (Date.now() + 1).toString(),
// //         content: response.data,
// //         sender: 'ai',
// //         timestamp: new Date()
// //       };
// //       setMessages(prev => [...prev, aiResponse]);
// //     }, 1000);
// //     }).catch((error)=>{
// //       toast.error("Error !")
// //     });

// //     // Simulate AI response
// //     // setTimeout(() => {
// //     //   const aiResponse: Message = {
// //     //     id: (Date.now() + 1).toString(),
// //     //     content: 'Great answer! Let me ask you another question. How do you handle state management in large React applications?',
// //     //     sender: 'ai',
// //     //     timestamp: new Date()
// //     //   };
// //     //   setMessages(prev => [...prev, aiResponse]);
// //     // }, 1000);
// //   };

// //   const handleKeyPress = (e: React.KeyboardEvent) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSendMessage();
// //     }
// //   };

// //   return (
// //     <AppLayout showNavigation>
// //       <div className="h-[calc(100vh-4rem)] flex">
// //         {/* Sidebar */}
// //         <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm`}>
// //           <div className={`${sidebarOpen ? 'p-4' : 'hidden'} h-full flex flex-col`}>
// //             <h2 className="text-lg font-semibold mb-4">Conversations</h2>
// //             <ScrollArea className="flex-1">
// //               <div className="space-y-2">
// //                 {mockConversations.map((conversation) => (
// //                   <Card
// //                     key={conversation.id}
// //                     className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
// //                       activeConversation === conversation.id ? 'bg-accent' : ''
// //                     }`}
// //                     onClick={() => setActiveConversation(conversation.id)}
// //                   >
// //                     <div className="flex items-start justify-between">
// //                       <div className="flex-1 min-w-0">
// //                         <div className="flex items-center space-x-2">
// //                           <h3 className="font-medium text-sm truncate">
// //                             {conversation.name}
// //                           </h3>
// //                           {conversation.unread && (
// //                             <div className="w-2 h-2 bg-primary rounded-full" />
// //                           )}
// //                         </div>
// //                         <p className="text-xs text-muted-foreground truncate mt-1">
// //                           {conversation.lastMessage}
// //                         </p>
// //                         <p className="text-xs text-muted-foreground mt-1">
// //                           {conversation.timestamp.toLocaleTimeString([], { 
// //                             hour: '2-digit', 
// //                             minute: '2-digit' 
// //                           })}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </Card>
// //                 ))}
// //               </div>
// //             </ScrollArea>
// //           </div>
// //         </div>

// //         {/* Chat Area */}
// //         <div className="flex-1 flex flex-col">
// //           {/* Chat Header */}
// //           <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
// //             <div className="flex items-center space-x-3">
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={() => setSidebarOpen(!sidebarOpen)}
// //                 className="md:hidden"
// //               >
// //                 <MoreVertical className="h-4 w-4" />
// //               </Button>
// //               <Avatar className="h-8 w-8">
// //                 <AvatarFallback className="bg-gradient-primary text-white">
// //                   <Bot className="h-4 w-4" />
// //                 </AvatarFallback>
// //               </Avatar>
// //               <div>
// //                 <h3 className="font-medium">AI Interview Coach</h3>
// //                 <p className="text-xs text-success">Online</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Messages */}
// //           <ScrollArea className="flex-1 p-4">
// //             <div className="space-y-4 max-w-4xl mx-auto">
// //               {messages.length === 0 ? (
// //                 <div className="text-center py-12">
// //                   <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
// //                   <h3 className="text-lg font-medium mb-2">Start your interview practice</h3>
// //                   <p className="text-muted-foreground">
// //                     Send a message to begin practicing with your AI interview coach
// //                   </p>
// //                 </div>
// //               ) : (
// //                 messages.map((msg) => (
// //                   <div
// //                     key={msg.id}
// //                     className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// //                   >
// //                     <div className={`flex space-x-3 max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
// //                       <Avatar className="h-8 w-8 flex-shrink-0">
// //                         <AvatarFallback className={msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
// //                           {msg.sender === 'user' ? (
// //                             <User className="h-4 w-4" />
// //                           ) : (
// //                             <Bot className="h-4 w-4" />
// //                           )}
// //                         </AvatarFallback>
// //                       </Avatar>
// //                       <div className={`px-4 py-2 rounded-lg ${
// //                         msg.sender === 'user' 
// //                           ? 'bg-chat-user text-chat-user-foreground' 
// //                           : 'bg-chat-bot text-chat-bot-foreground border border-border'
// //                       }`}>
// //                         <p className="text-sm">{msg.content}</p>
// //                         <p className="text-xs opacity-70 mt-1">
// //                           {msg.timestamp.toLocaleTimeString([], { 
// //                             hour: '2-digit', 
// //                             minute: '2-digit' 
// //                           })}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
// //           </ScrollArea>

// //           {/* Message Input */}
// //           <div className="border-t border-border p-4 bg-card/50 backdrop-blur-sm">
// //             <div className="flex items-end space-x-2 max-w-4xl mx-auto">
// //               <div className="flex-1 relative">
// //                 <Input
// //                   value={message}
// //                   onChange={(e) => setMessage(e.target.value)}
// //                   onKeyPress={handleKeyPress}
// //                   placeholder="Type your message..."
// //                   className="pr-10 min-h-[2.5rem] resize-none"
// //                 />
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
// //                 >
// //                   <Smile className="h-4 w-4" />
// //                 </Button>
// //               </div>
// //               <Button
// //                 onClick={handleSendMessage}
// //                 disabled={!message.trim()}
// //                 className="bg-gradient-primary hover:opacity-90 h-10 w-10 p-0"
// //               >
// //                 <Send className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </AppLayout>
// //   );
// // };



// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Smile, MoreVertical, Bot, User, Loader2 } from 'lucide-react'; // Import Loader2 for spinner
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { AppLayout } from '@/layouts/AppLayout';
// import { sendPrompt } from '@/APIService/PrepTalkAPI';
// import { toast } from 'sonner';

// interface Message {
//     id: string;
//     content: string;
//     sender: 'user' | 'ai';
//     timestamp: Date;
// }

// interface Conversation {
//     id: string;
//     name: string;
//     lastMessage: string;
//     timestamp: Date;
//     unread?: boolean;
// }

// const mockConversations: Conversation[] = [
//     {
//         id: '1',
//         name: 'Technical Interview Prep',
//         lastMessage: 'Let\'s practice some React questions',
//         timestamp: new Date(),
//         unread: true
//     },
//     {
//         id: '2',
//         name: 'Behavioral Questions',
//         lastMessage: 'Tell me about a challenging project...',
//         timestamp: new Date(Date.now() - 3600000),
//     },
//     {
//         id: '3',
//         name: 'System Design Practice',
//         lastMessage: 'How would you design a chat system?',
//         timestamp: new Date(Date.now() - 7200000),
//     }
// ];

// const mockMessages: Message[] = [
//     {
//         id: '1',
//         content: 'Hello! I\'m your AI Interview Coach. I\'m here to help you practice and improve your interview skills. What type of interview would you like to practice today?',
//         sender: 'ai',
//         timestamp: new Date(Date.now() - 1800000)
//     },
//     {
//         id: '2',
//         content: 'Hi! I\'d like to practice for a frontend developer position, specifically React.',
//         sender: 'user',
//         timestamp: new Date(Date.now() - 1740000)
//     },
//     {
//         id: '3',
//         content: 'Perfect! Let\'s start with some technical React questions. Can you explain the difference between controlled and uncontrolled components in React?',
//         sender: 'ai',
//         timestamp: new Date(Date.now() - 1680000)
//     },
//     {
//         id: '4',
//         content: 'Controlled components are those where form data is handled by the React component through state, while uncontrolled components store their own state internally.',
//         sender: 'user',
//         timestamp: new Date(Date.now() - 1620000)
//     }
// ];

// export const Chat = () => {
//     const [activeConversation, setActiveConversation] = useState('1');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState<Message[]>(mockMessages);
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false); // New state for loader
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const handleSendMessage = async () => { // Make function async
//         if (!message.trim() || isLoadingAIResponse) return; // Prevent sending if already loading or message is empty

//         const userMessage: Message = { // Renamed newMessage to userMessage for clarity
//             id: Date.now().toString(),
//             content: message,
//             sender: 'user',
//             timestamp: new Date()
//         };

//         setMessages(prev => [...prev, userMessage]);
//         setMessage(''); // Clear input immediately
//         setIsLoadingAIResponse(true); // Set loading to true

//         try {
//             const response = await sendPrompt(userMessage.content); // Use userMessage.content
//             const aiResponse: Message = {
//                 id: (Date.now() + 1).toString(),
//                 content: response.data,
//                 sender: 'ai',
//                 timestamp: new Date()
//             };
//             setMessages(prev => [...prev, aiResponse]);
//         } catch (error) {
//             console.error("Error sending prompt:", error);
//             toast.error("Error generating response! Please try again.");
//         } finally {
//             setIsLoadingAIResponse(false); // Always set loading to false after response or error
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     return (
//         <AppLayout showNavigation>
//             <div className="h-[calc(100vh-4rem)] flex">
//                 {/* Sidebar */}
//                 <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm`}>
//                     <div className={`${sidebarOpen ? 'p-4' : 'hidden'} h-full flex flex-col`}>
//                         <h2 className="text-lg font-semibold mb-4">Conversations</h2>
//                         <ScrollArea className="flex-1">
//                             <div className="space-y-2">
//                                 {mockConversations.map((conversation) => (
//                                     <Card
//                                         key={conversation.id}
//                                         className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
//                                             activeConversation === conversation.id ? 'bg-accent' : ''
//                                         }`}
//                                         onClick={() => setActiveConversation(conversation.id)}
//                                     >
//                                         <div className="flex items-start justify-between">
//                                             <div className="flex-1 min-w-0">
//                                                 <div className="flex items-center space-x-2">
//                                                     <h3 className="font-medium text-sm truncate">
//                                                         {conversation.name}
//                                                     </h3>
//                                                     {conversation.unread && (
//                                                         <div className="w-2 h-2 bg-primary rounded-full" />
//                                                     )}
//                                                 </div>
//                                                 <p className="text-xs text-muted-foreground truncate mt-1">
//                                                     {conversation.lastMessage}
//                                                 </p>
//                                                 <p className="text-xs text-muted-foreground mt-1">
//                                                     {conversation.timestamp.toLocaleTimeString([], {
//                                                         hour: '2-digit',
//                                                         minute: '2-digit'
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </Card>
//                                 ))}
//                             </div>
//                         </ScrollArea>
//                     </div>
//                 </div>

//                 {/* Chat Area */}
//                 <div className="flex-1 flex flex-col">
//                     {/* Chat Header */}
//                     <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
//                         <div className="flex items-center space-x-3">
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                                 className="md:hidden"
//                             >
//                                 <MoreVertical className="h-4 w-4" />
//                             </Button>
//                             <Avatar className="h-8 w-8">
//                                 <AvatarFallback className="bg-gradient-primary text-white">
//                                     <Bot className="h-4 w-4" />
//                                 </AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 <h3 className="font-medium">AI Interview Coach</h3>
//                                 <p className="text-xs text-success">Online</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Messages */}
//                     <ScrollArea className="flex-1 p-4">
//                         <div className="space-y-4 max-w-4xl mx-auto">
//                             {messages.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                                     <h3 className="text-lg font-medium mb-2">Start your interview practice</h3>
//                                     <p className="text-muted-foreground">
//                                         Send a message to begin practicing with your AI interview coach
//                                     </p>
//                                 </div>
//                             ) : (
//                                 messages.map((msg) => (
//                                     <div
//                                         key={msg.id}
//                                         className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                                     >
//                                         <div className={`flex space-x-3 max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                                             <Avatar className="h-8 w-8 flex-shrink-0">
//                                                 <AvatarFallback className={msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
//                                                     {msg.sender === 'user' ? (
//                                                         <User className="h-4 w-4" />
//                                                     ) : (
//                                                         <Bot className="h-4 w-4" />
//                                                     )}
//                                                 </AvatarFallback>
//                                             </Avatar>
//                                             <div className={`px-4 py-2 rounded-lg ${
//                                                 msg.sender === 'user'
//                                                     ? 'bg-chat-user text-chat-user-foreground'
//                                                     : 'bg-chat-bot text-chat-bot-foreground border border-border'
//                                             }`}>
//                                                 <p className="text-sm">{msg.content}</p>
//                                                 <p className="text-xs opacity-70 mt-1">
//                                                     {msg.timestamp.toLocaleTimeString([], {
//                                                         hour: '2-digit',
//                                                         minute: '2-digit'
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                             {isLoadingAIResponse && ( // Display AI thinking message when loading
//                                 <div className="flex justify-start">
//                                     <div className="flex space-x-3 max-w-3xl">
//                                         <Avatar className="h-8 w-8 flex-shrink-0">
//                                             <AvatarFallback className="bg-muted">
//                                                 <Bot className="h-4 w-4" />
//                                             </AvatarFallback>
//                                         </Avatar>
//                                         <div className="px-4 py-2 rounded-lg bg-chat-bot text-chat-bot-foreground border border-border flex items-center space-x-2">
//                                             <Loader2 className="h-4 w-4 animate-spin" />
//                                             <p className="text-sm">AI is thinking...</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             <div ref={messagesEndRef} />
//                         </div>
//                     </ScrollArea>

//                     {/* Message Input */}
//                     <div className="border-t border-border p-4 bg-card/50 backdrop-blur-sm">
//                         <div className="flex items-end space-x-2 max-w-4xl mx-auto">
//                             <div className="flex-1 relative">
//                                 <Input
//                                     value={message}
//                                     onChange={(e) => setMessage(e.target.value)}
//                                     onKeyPress={handleKeyPress}
//                                     placeholder="Type your message..."
//                                     className="pr-10 min-h-[2.5rem] resize-none"
//                                     disabled={isLoadingAIResponse} // Disable input when loading
//                                 />
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
//                                 >
//                                     <Smile className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                             <Button
//                                 onClick={handleSendMessage}
//                                 disabled={!message.trim() || isLoadingAIResponse} // Disable button when loading or message empty
//                                 className="bg-gradient-primary hover:opacity-90 h-10 w-10 p-0"
//                             >
//                                 {isLoadingAIResponse ? ( // Show spinner in button when loading
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                 ) : (
//                                     <Send className="h-4 w-4" />
//                                 )}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AppLayout>
//     );
// };

import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, MoreVertical, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AppLayout } from '@/layouts/AppLayout';
import { sendPrompt } from '@/APIService/PrepTalkAPI';
import { toast } from 'sonner';

// Import React Markdown and its plugins
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, task lists etc.)
import rehypeRaw from 'rehype-raw'; // For rendering raw HTML (use with caution, if AI returns HTML)

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: Date;
    unread?: boolean;
}

const mockConversations: Conversation[] = [
    {
        id: '1',
        name: 'Technical Interview Prep',
        lastMessage: 'Let\'s practice some React questions',
        timestamp: new Date(),
        unread: true
    },
    {
        id: '2',
        name: 'Behavioral Questions',
        lastMessage: 'Tell me about a challenging project...',
        timestamp: new Date(Date.now() - 3600000),
    },
    {
        id: '3',
        name: 'System Design Practice',
        lastMessage: 'How would you design a chat system?',
        timestamp: new Date(Date.now() - 7200000),
    }
];

const mockMessages: Message[] = [
   
];

export const Chat = () => {
    const [activeConversation, setActiveConversation] = useState('1');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message.trim() || isLoadingAIResponse) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: message,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setMessage('');
        setIsLoadingAIResponse(true);

        try {
            // Assuming sendPrompt returns a response object with a 'data' field
            // that contains the Markdown formatted string from the AI.
            const response = await sendPrompt(userMessage.content);
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: response.data, // This 'data' should now be your Markdown string
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error("Error sending prompt:", error);
            toast.error("Error generating response! Please try again.");
        } finally {
            setIsLoadingAIResponse(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Define custom components for ReactMarkdown to apply Tailwind CSS classes
    const markdownComponents = {
        h1: ({ node, ...props }: any) => <h1 className="text-2xl font-bold mt-4 mb-2 text-foreground" {...props} />,
        h2: ({ node, ...props }: any) => <h2 className="text-xl font-semibold mt-3 mb-1 text-foreground" {...props} />,
        h3: ({ node, ...props }: any) => <h3 className="text-lg font-medium mt-2 mb-1 text-foreground" {...props} />,
        p: ({ node, ...props }: any) => <p className="text-sm leading-relaxed mb-1" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="list-disc list-inside ml-4 my-2 space-y-1" {...props} />,
        ol: ({ node, ...props }: any) => <ol className="list-decimal list-inside ml-4 my-2 space-y-1" {...props} />,
        li: ({ node, ...props }: any) => <li className="text-sm" {...props} />,
        strong: ({ node, ...props }: any) => <strong className="font-semibold text-foreground" {...props} />,
        em: ({ node, ...props }: any) => <em className="italic" {...props} />,
        a: ({ node, ...props }: any) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto text-xs my-2">
                    <code className={`language-${match[1]}`} {...props}>
                        {children}
                    </code>
                </pre>
            ) : (
                <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded text-xs" {...props}>
                    {children}
                </code>
            );
        },
        blockquote: ({ node, ...props }: any) => (
            <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-muted-foreground my-2" {...props} />
        ),
        hr: ({ node, ...props }: any) => <hr className="my-4 border-t border-border" {...props} />,
        table: ({ node, ...props }: any) => (
            <table className="min-w-full divide-y divide-border rounded-md overflow-hidden my-2" {...props} />
        ),
        thead: ({ node, ...props }: any) => <thead className="bg-muted" {...props} />,
        th: ({ node, ...props }: any) => (
            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" {...props} />
        ),
        tbody: ({ node, ...props }: any) => <tbody className="divide-y divide-border" {...props} />,
        td: ({ node, ...props }: any) => <td className="px-4 py-2 whitespace-nowrap text-sm" {...props} />,
    };


    return (
        <AppLayout showNavigation>
            <div className="h-[calc(100vh-4rem)] flex">
                {/* Sidebar */}
                <div className="hidden md:block w-80 transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm">
                    {/* The sidebar content is always visible on medium and larger screens */}
                    <div className="p-4 h-full flex flex-col">
                        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
                        <ScrollArea className="flex-1">
                            <div className="space-y-2">
                                {mockConversations.map((conversation) => (
                                    <Card
                                        key={conversation.id}
                                        className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                                            activeConversation === conversation.id ? 'bg-accent' : ''
                                        }`}
                                        onClick={() => setActiveConversation(conversation.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-medium text-sm truncate">
                                                        {conversation.name}
                                                    </h3>
                                                    {conversation.unread && (
                                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate mt-1">
                                                    {conversation.lastMessage}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {conversation.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden" // Only show on mobile
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gradient-primary text-white">
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium">AI Interview Coach</h3>
                                <p className="text-xs text-success">Online</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4 max-w-4xl mx-auto">
                            {messages.length === 0 ? (
                                <div className="text-center py-12">
                                    <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Start your interview practice</h3>
                                    <p className="text-muted-foreground">
                                        Send a message to begin practicing with your AI interview coach
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex space-x-3 max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                <AvatarFallback className={msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                                                    {msg.sender === 'user' ? (
                                                        <User className="h-4 w-4" />
                                                    ) : (
                                                        <Bot className="h-4 w-4" />
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={`px-4 py-2 rounded-lg ${
                                                msg.sender === 'user'
                                                    ? 'bg-chat-user text-chat-user-foreground'
                                                    : 'bg-chat-bot text-chat-bot-foreground border border-border'
                                            }`}>
                                                {msg.sender === 'ai' ? (
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        rehypePlugins={[rehypeRaw]}
                                                        components={markdownComponents}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                ) : (
                                                    <p className="text-sm">{msg.content}</p>
                                                )}
                                                <p className="text-xs opacity-70 mt-1">
                                                    {msg.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoadingAIResponse && (
                                <div className="flex justify-start">
                                    <div className="flex space-x-3 max-w-3xl">
                                        <Avatar className="h-8 w-8 flex-shrink-0">
                                            <AvatarFallback className="bg-muted">
                                                <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="px-4 py-2 rounded-lg bg-chat-bot text-chat-bot-foreground border border-border flex items-center space-x-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <p className="text-sm">AI is thinking...</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="border-t border-border p-4 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-end space-x-2 max-w-4xl mx-auto">
                            <div className="flex-1 relative">
                                <Input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="pr-10 min-h-[2.5rem] resize-none"
                                    disabled={isLoadingAIResponse}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                                >
                                    <Smile className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button
                                onClick={handleSendMessage}
                                disabled={!message.trim() || isLoadingAIResponse}
                                className="bg-gradient-primary hover:opacity-90 h-10 w-10 p-0"
                            >
                                {isLoadingAIResponse ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
