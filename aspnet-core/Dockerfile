# image from docker hub for build process
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build

# public dotnet solution
WORKDIR /src
COPY . .

RUN dotnet publish --output /app/publish

# Copy the published app to this new runtime-only container.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim

# Expose port 8080 to your local machine so you can access the app.
EXPOSE 8080

# Copy the published app to this new runtime-only container.
COPY --from=build /app/publish .

# To run the app, run , which we just copied over.
ENTRYPOINT ["dotnet", "SE347.L11_HelloWork.Web.Host.dll"]