import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MessengerPageComponent } from './messenger-page/messenger-page.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AccountVerifyComponent } from './auth/account-verify/account-verify.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { MailSentComponent } from './auth/mail-sent/mail-sent.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { MailSentFromForgotpasswordComponent } from './auth/mail-sent-from-forgotpassword/mail-sent-from-forgotpassword.component';
import { MessagesComponent } from './messenger/messages/messages.component';
import { ContactListComponent } from './panels/contact-list/contact-list.component';
import { TookupLoaderComponent } from './ui/tookup-loader/tookup-loader.component';
import { AddContactComponent } from './modal/add-contact/add-contact.component';
import { NotesModelComponent } from './modal/notes-model/notes-model.component';
import { SetReminderModalComponent } from './modal/set-reminder-modal/set-reminder-modal.component';
import { SnippetModalComponent } from './modal/snippet-modal/snippet-modal.component';
import { AudioCallModalComponent } from './modal/audio-call-modal/audio-call-modal.component';
import { VideoCallModalComponent } from './modal/video-call-modal/video-call-modal.component';
import { ConferenceCallModalComponent } from './modal/conference-call-modal/conference-call-modal.component';
import { ConferenceVideoCallModalComponent } from './modal/conference-video-call-modal/conference-video-call-modal.component';
import { AudioReceiveCallModalComponent } from './modal/audio-receive-call-modal/audio-receive-call-modal.component';
import { AddCallModalComponent } from './modal/add-call-modal/add-call-modal.component';
import { TodoModalComponent } from './modal/todo-modal/todo-modal.component';
import { CreateTodoModalComponent } from './modal/create-todo-modal/create-todo-modal.component';
import { MessageChatModalComponent } from './modal/message-chat-modal/message-chat-modal.component';
import { MessageCallModalComponent } from './modal/message-call-modal/message-call-modal.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainNavDrawersComponent } from './components/main-nav-drawers/main-nav-drawers.component';
import { ProfilePersonalInformationComponent } from './components/profile-personal-information/profile-personal-information.component';
import { RightNavigationAndDrawersComponent } from './components/right-navigation-and-drawers/right-navigation-and-drawers.component';
import { MessagingTypingInputComponent } from './shared/messaging-typing-input/messaging-typing-input.component';
import { GroupChatComponent } from './tabs-pages/group-chat/group-chat.component';
import { ChatContentTabComponent } from './tabs-pages/chat-content-tab/chat-content-tab.component';
import { CallContentTabComponent } from './tabs-pages/call-content-tab/call-content-tab.component';
import { ContactContentTabComponent } from './tabs-pages/contact-content-tab/contact-content-tab.component';
import { ChooseContactsForSendContactsListModalComponent } from './modal/choose-contacts-for-send-contacts-list-modal/choose-contacts-for-send-contacts-list-modal.component';
import { DocumentListComponent } from './panels/document-list/document-list.component';
import { EllipsisSpinnerComponent } from './ui/ellipsis-spinner/ellipsis-spinner.component';
import { CreatePollModalComponent } from './modal/create-poll-modal/create-poll-modal.component';
import { ToastComponent } from './ui/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MessengerPageComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    SignupComponent,
    AccountVerifyComponent,
    PasswordResetComponent,
    MailSentComponent,
    ForgotPasswordComponent,
    MailSentFromForgotpasswordComponent,
    MessagesComponent,
    ContactListComponent,
    TookupLoaderComponent,
    AddContactComponent,
    NotesModelComponent,
    SetReminderModalComponent,
    SnippetModalComponent,
    AudioCallModalComponent,
    VideoCallModalComponent,
    ConferenceCallModalComponent,
    ConferenceVideoCallModalComponent,
    AudioReceiveCallModalComponent,
    AddCallModalComponent,
    TodoModalComponent,
    CreateTodoModalComponent,
    MessageChatModalComponent,
    MessageCallModalComponent,
    MainNavComponent,
    MainNavDrawersComponent,
    ProfilePersonalInformationComponent,
    RightNavigationAndDrawersComponent,
    MessagingTypingInputComponent,
    GroupChatComponent,
    ChatContentTabComponent,
    CallContentTabComponent,
    ContactContentTabComponent,
    ChooseContactsForSendContactsListModalComponent,
    DocumentListComponent,
    EllipsisSpinnerComponent,
    CreatePollModalComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
