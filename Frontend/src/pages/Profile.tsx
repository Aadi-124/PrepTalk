import React, { useState } from 'react';
import { Camera, Edit, Save, X, User, Mail, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/AppLayout';

interface UserProfile {
  name: string;
  email: string;
  title: string;
  location: string;
  bio: string;
  joinDate: string;
}

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    title: 'Frontend Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate frontend developer with 3 years of experience in React and TypeScript. Currently preparing for senior role interviews.',
    joinDate: 'January 2024'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Interviews Practiced', value: '24', color: 'text-primary' },
    { label: 'Questions Answered', value: '156', color: 'text-success' },
    { label: 'Average Score', value: '87%', color: 'text-warning' },
    { label: 'Streak Days', value: '12', color: 'text-primary' }
  ];

  return (
    <AppLayout showNavigation>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="shadow-medium">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-medium"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <Button
                      variant={isEditing ? "ghost" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2"
                    >
                      {isEditing ? (
                        <>
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4" />
                          <span>Edit Profile</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{profile.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium">About</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Practice Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-lg bg-muted/50">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          {isEditing && (
            <Card className="shadow-medium animate-slide-up">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                      id="edit-name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Job Title</Label>
                    <Input
                      id="edit-title"
                      value={editedProfile.title}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <textarea
                    id="edit-bio"
                    className="w-full p-3 border border-border rounded-md bg-background text-foreground min-h-[100px] resize-none"
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};