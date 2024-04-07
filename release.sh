# USAGE bash ./release.sh <new.version.number>


# Extract version using grep and sed
version=$(grep -o '"version": *"[^"]*"' package.json | sed 's/"version": "\(.*\)"/\1/')
echo "---"
echo "Current version: $version"
echo "---\n"


if [ $# -lt 1 ]
then
   echo "Usage:"
   echo "\tsh release.sh <Version-No>"
   exit
fi

echo "Updating package version.. to $1"
yarn version --new-version $1 --no-git-tag-version
if [ $? != 0 ]
then
    echo "Updating package version.. to $1. Failed."
    exit
fi
echo "Updating package version.. to $1. Done"



CAN_BUILD_ANDROID=0

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "CURRENT OS: Linux gnu"
elif [[ "$OSTYPE" == "darwin"* ]]; then
        CAN_BUILD_ANDROID=1
        echo "CURRENT OS: Mac OS"
        # Mac OSX
elif [[ "$OSTYPE" == "cygwin" ]]; then
        echo "CURRENT OS: Cygwin"
        # POSIX compatibility layer and Linux environment emulation for Windows
elif [[ "$OSTYPE" == "msys" ]]; then
        echo "CURRENT OS: MSys"
        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
elif [[ "$OSTYPE" == "win32" ]]; then
        echo "CURRENT OS: Win32"
        # I'm not sure this can happen.
elif [[ "$OSTYPE" == "freebsd"* ]]; then
        echo "CURRENT OS: Freebsd"
        # ...
else
    echo "Unknown OS."
        # Unknown.
fi

# ANDROID RELEASE BUILD

#if [ $CAN_BUILD_ANDROID != 0 ]
#then
#    read -p "You are using Mac OS. Do you want a ANDROID build? [Y/N] " -n 1 -r
#    echo    # (optional) move to a new line
#    if [[ $REPLY =~ ^[Yy]$ ]]
#    then
#        cd android
#        ./gradlew clean
#        if [ $? != 0 ]
#        then
#            exit
#        fi
#        ./gradlew assembleRelease
#        if [ $? != 0 ]
#        then
#            exit
#        fi
#        mkdir -p ~/Desktop/release-$1
#        cp app/build/outputs/apk/release/*.apk ~/Desktop/release-$1/
#        cd ..
#        PLATFORM=' ANDROID '
#    fi
#else
#    echo "Versioning is done. Please run android build manually."    
#fi

# IOS VERSION INCREASE
# read -p "Do you want a IOS verson? [Y/N] " -n 1 -r
# echo    # (optional) move to a new line
# if [[ $REPLY =~ ^[Yy]$ ]]
# then
#     sh ./version-ios.sh
#     if [ $? == 0 ]
#     then
#         echo "IOS versioning.. Done."
#     else
#         echo "IOS versioning.. Failed."
#     fi
#     PLATFORM="$PLATFORM IOS"
# fi    

echo "Tagging in git ..."
git tag $1 -m "changelog:$2 | $PLATFORM"
if [ $? != 0 ]
then
echo "Tagging in git.. Failed."
    exit
fi
echo "Tagging in git.. Done."